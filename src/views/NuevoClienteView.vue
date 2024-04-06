<script setup>
    import { FormKit } from '@formkit/vue'
    import { useRouter } from 'vue-router';
    import ClienteService from '@/services/ClienteService';
    import RouterLink from '../components/UI/RouterLink.vue'
    import Heading from '@/components/UI/Heading.vue';

    const router = useRouter() //informacion del router completo

    defineProps({
        title: String
    })

    const handleSubmit = data => {
        data.status = 1
        ClienteService.storeClient(data)
            .then(res => {
                // Redireccionar
                router.push({ name: 'listado-clientes' })
                
            })
            .catch(e => console.error(e))
    }
</script>
<template>
    <div>
        <div class="flex justify-end">
            <RouterLink
            :to="{name: 'listado-clientes'}"
        >
            Volver a inicio
        </RouterLink>
        </div>
        <Heading>{{ title }}</Heading>

        <div class="mx-auto mt-10 bg-white shadow">
            <div class="mx-auto md:2/3 py-20 px-6">
                <FormKit
                    type="form"
                    submit-label="Agregar cliente"
                    incomplete-message="No se pudo enviar, revisa los mensajes"
                    @submit="handleSubmit"
                >
                    <FormKit
                        type="text"
                        label="Nombre"
                        placeholder="Nombre del cliente"
                        help="Coloca el nombre del cliente que deseas registrar"
                        validation="required"
                        :validation-messages="{ required: 'El nombre del cliente es obligatorio '}"
                        validation-visibility="blur"
                        name="name"
                    />
                    <FormKit
                        type="text"
                        label="Apellido"
                        placeholder="Apellido del cliente"
                        validation="required"
                        :validation-messages="{ required: 'El apellido del cliente es obligatorio '}"
                        validation-visibility="blur"
                        name="lastname"
                    />
                    <FormKit
                        type="email"
                        label="Email"
                        placeholder="Email del cliente"
                        prefix-icon="email"
                        validation="required|email"
                        :validation-messages="{ required: 'El email del cliente es obligatorio', email: 'Coloca un email válido '}"
                        validation-visibility="blur"
                        name="email"
                    />
                    <FormKit
                        type="text"
                        label="Teléfono"
                        placeholder="Teléfono: XXX-XXX-XXXX"
                        prefix-icon="telephone"
                        validation="?matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
                        :validation-messages="{ matches: 'El formato no es válido'}"
                        validation-visibility="blur"
                        name="phone"
                    />
                    <FormKit
                        type="text"
                        label="Empresa"
                        placeholder="Empresa del cliente"
                        suffix-icon="group"
                        name="enterprise"
                    />
                    <FormKit
                        type="text"
                        label="Puesto"
                        placeholder="Puesto del cliente"
                        name="employment"
                    />
                    <!-- <FormKit
                        type="submit"
                        label="Agregar cliente"
                    /> -->
                </FormKit>
            </div>
        </div>
    </div>
</template>
<style>
    .formkit-wrapper {
        max-width: 100%;
    }
</style>