<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'article' => ['required', 'string', 'max:255', 'unique:products'],
            'name' => ['required', 'string', 'min:10', 'max:255'],
            'status' => ['required', 'string', 'max:255', Rule::in(["available", "unavailable"])],
            'data' => ['nullable', 'json'],
        ];
    }
}
