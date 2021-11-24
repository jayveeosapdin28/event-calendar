<template>
    <div class="p-2">
        <div class="card p-2">
            <div class="card-title">
                <h2 class="fw-bold">Event Calendar</h2>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3">
                        <calendar-form/>
                    </div>
                    <div class="col-md-9">
                        <event-table/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


import CalendarForm from "../../Components/Calendar/Form";
import EventTable from "../../Components/Calendar/Table";


export default {
    name: "App",
    components: {EventTable, CalendarForm},
}
</script>

<style scoped>
</style>
