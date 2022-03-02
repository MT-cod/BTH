<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['article', 'name', 'status', 'data', 'updated_at'];

    public function scopeAvailable($query): void
    {
        $query->where('status', 'available');
    }
}
