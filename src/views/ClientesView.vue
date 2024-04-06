<script setup>
    import { onMounted, ref, computed } from 'vue'
    import ClienteService from '@/services/ClienteService'
    import RouterLink from '../components/UI/RouterLink.vue'
    import Heading from '@/components/UI/Heading.vue';
    import Cliente from '../components/Cliente.vue'

    const clients = ref([])

    defineProps({
        title: String
    })

    onMounted(() => {
        ClienteService.getClients()
            .then(({data}) => clients.value = data)
            .catch( e => console.error("Hubo un error",e))
    })

    const existenClientes = computed(() => clients.value.length > 0 )

    const updateStatus = ({id, status}) => {
        ClienteService.updateClient(id, {status: !status})
            .then(() => {
                const i = clients.value.findIndex(client => client.id === id)
                clients.value[i].status = !status
            })
            .catch(e => console.error(e))
    }

    const deleteClient = id => {
        ClienteService.deleteClient(id)
            .then(() => clients.value = clients.value.filter(client => client.id !== id))
            .catch(e => console.error(e))
    }
</script>
<template>
    <div>
        <div class="flex justify-end">
            <RouterLink 
                :to="{name: 'add-client'}"
            >
                Agregar cliente
            </RouterLink>
        </div>
        <Heading>{{ title }}</Heading>
        <div v-if="existenClientes">
            <div v-if="existenClientes" class="flow-root mx-auto  mt-10 p-5 bg-white shadow">
                <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Nombre</th>
                                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Empresa</th>
                                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Estado</th>
                                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Acciones</th>
                            </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <Cliente
                                    v-for="client in clients"
                                    :key="client.id"
                                    :client="client"
                                    @update-status="updateStatus"
                                    @delete-client="deleteClient"
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="text-center mt-10">
            No hay
        </div>
    </div>
</template>