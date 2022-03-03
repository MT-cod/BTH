<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'article' => [
                'required',
                'string',
                'max:255',
                Rule::unique('products')->ignore(request()->product),
                function ($attr, $val, $fail): void {
                    if (Auth::user()->role === config('products.role')) {
                        $fail('Пользователь не имеет права на редактирование артикула!');
                    }
                }],
            'name' => ['required', 'string', 'min:10', 'max:255'],
            'status' => ['required', 'string', 'max:255', Rule::in(["available", "unavailable"])],
            'data' => ['nullable', 'json']
        ];
    }
}
