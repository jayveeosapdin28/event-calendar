<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEventCalendarRequest;
use App\Http\Resources\EventCalendarResources;
use App\Models\Event;
use App\Models\EventDay;
use Illuminate\Http\Request;

class EventCalendarController extends Controller
{
    public function index(){
        return new EventCalendarResources(Event::with(['days'])->latest()->first());
    }
    public function store(StoreEventCalendarRequest $request){
        $event = Event::create([
            'date_from' => $request['date_from'],
            'date_to'  => $request['date_to'],
            'name'  => $request['name']
        ]);

        foreach($request['days'] as $day){
            EventDay::create([
                'event_id' => $event->id,
                'day' => $day
            ]);
        }
        return (new EventCalendarResources($event))
            ->response()
            ->setStatusCode(201);
    }
}
