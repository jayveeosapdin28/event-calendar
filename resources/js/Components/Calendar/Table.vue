<template>
    <div>
        <div>
            <h3 class="fw-bold">{{ getMonthYear() }}</h3>
        </div>
        <div>
            <table class="table table-hover table-striped ">
                <tbody>
                <tr v-for="date in dateArr">
                    <td style="width: 1rem"><span class="fs-4 fw-bold">{{ new Date(date).getDate() }}</span></td>
                    <td style="width: 1rem" class="">
                        {{ calendar.weekdays[new Date(date).getDay()] }}
                    </td>
                    <td>
                        <div v-if="hasEvent(date)">
                            <div>
                                <div
                                     class="alert alert-success" role="alert">
                                    <p class="w-100 ">
                                        {{ tableData.name }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

const current = new Date();
export default {
    name: "EventTable",
    data:()=>({
        daysInMonth: 0,
        dateArr: null,
        calendar: {
            weekdays: ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            month: [ "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December" ],
        },
    }),
    computed:{
      ...mapGetters('CalendarIndex',['tableData']),
    },
    methods:{
        ...mapActions('CalendarIndex',['fetchData','resetState']),
        hasEvent(date){
            var curr_date = new Date(date)
            return (new Date(this.tableData.date_from) <= curr_date && new Date(this.tableData.date_to) >= curr_date) &&  this.tableData.days.some(event => event.day == curr_date.getDay())
        },
        getDaysInMonth(){
            return new Date(current.getFullYear(), current.getMonth()+1, 0).getDate();
        },
        getMonthYear(){
            return this.calendar.month[current.getMonth()]+" "+current.getFullYear();
        },
        dateRange(start,end){
           var date = new Date(start), dateArr = new Array();
            while (date <= end) {
                dateArr.push(new Date(date));
                date.setDate(date.getDate() + 1);
            }
            return dateArr;
        }
    },
    mounted() {
        this.fetchData();
        this.dateArr = this.dateRange(new Date(current.getFullYear()+'-'+(current.getMonth()+1)+'-01'),
            new Date(current.getFullYear()+'-'+(current.getMonth()+1)+'-'+this.getDaysInMonth()));

    }
}
</script>

<style scoped>

</style>
