<template>
    <!--form-->
    <form @submit.prevent="submit">
        <div class="form">
            <div>
                <label for="eventTitle">Event</label>
                <input @input="setName($event.target.value)"
                       v-model="item.name"
                       id="eventTitle"
                       type="text"
                       class="form-control "
                       :class="formErrors.name != null ? 'is-invalid' : ''"
                       placeholder="Event name" >
                <div v-if="formErrors.name" class="invalid-feedback">
                    {{formErrors.name[0]}}
                </div>
            </div>
            <div class="row my-2">
                <div class="col-md-6">
                    <label for="dateFrom">From</label>
                    <input @input="setDateFrom($event.target.value)"
                           v-model="item.date_from"
                           id="dateFrom"
                           type="text"
                           onfocus="(this.type='date')" onblur="(this.type='text')"
                           class="form-control "
                           :class="formErrors.date_from != null ? 'is-invalid' : ''"
                           placeholder="Start" >
                    <div v-if="formErrors.date_from" class="invalid-feedback">
                        {{formErrors.date_from[0]}}
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="dateT0">From</label>
                    <input @input="setDateTo($event.target.value)"
                           v-model="item.date_to"
                           id="dateT0"
                           type="text"
                           onfocus="(this.type='date')" onblur="(this.type='text')"
                           class="form-control "
                           :class="formErrors.date_to != null ? 'is-invalid' : ''"
                           placeholder="Start" >
                    <div v-if="formErrors.date_to" class="invalid-feedback">
                        {{formErrors.date_to[0]}}
                    </div>
                </div>
            </div>
            <div class="my-3">
                <!--Day in a week checkBox-->
                <div v-for="day in weekDays" :key="day.id" class="form-check">
                    <input name="day" v-model="selectedDays" :id="day.id" class="form-check-input"
                           type="checkbox" :value="day.id">
                    <label class="form-check-label" :for="day.id">
                        {{ day.label }}
                    </label>
                </div>
                <!--End of Day in a week checkBox-->
            </div>
            <div>
                <button type="submit" class="form-control btn btn-info text-white text-uppercase">Save</button>
            </div>
        </div>
    </form>
    <!--end form-->
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "CalendarForm",
    data: () => ({
        selectedDays: [],
    }),
    computed: {
        ...mapGetters('CalendarSingle', ['item','weekDays' ,'formErrors']),
        ...mapGetters('CalendarIndex', ['tableData']),
    },
    watch:{
        selectedDays(){
           this.setDays(this.selectedDays)
        },
    },
    methods: {
        ...mapActions('CalendarSingle', ['setDateFrom', 'setDateTo', 'setName','setDays','resetState','storeData']),
        ...mapActions('CalendarIndex',['fetchData']),
        submit(){
            this.storeData().then(data=>{
                this.selectedDays = [];
                this.fetchData();
            });
        }
    }
}
</script>

<style scoped>

</style>
