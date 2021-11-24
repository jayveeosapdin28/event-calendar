<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    protected $fillable = ['date_from','date_to','name'];

    public function days(){
        return $this->hasMany(EventDay::class,'event_id','id');
    }
}
