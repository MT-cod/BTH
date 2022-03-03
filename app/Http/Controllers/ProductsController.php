<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Response;
use App\Jobs\SendEmailJob;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Application|Factory|View
     */
    public function index(): View|Factory|Application
    {
        return view('product.index', ['data' => Product::all()->toArray()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreProductRequest $request
     * @return RedirectResponse
     */
    public function store(StoreProductRequest $request): RedirectResponse
    {
        try {
            $productData = Product::create($request->validated()->get()->toArray());
            //dispatch(new SendEmailJob($productData));
            flash('Продкут успешно создан!')->success()->important();
            return Redirect::to($_SERVER['HTTP_REFERER']);
        } catch (\Throwable $e) {
            flash('Не удалось создать продукт!')->error()->important();
            return Redirect::to($_SERVER['HTTP_REFERER']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param Product $product
     * @return JsonResponse
     */
    public function show(Product $product): JsonResponse
    {
        return Response::json(Product::findOrFail($product)->get()->toArray());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateProductRequest $request
     * @param Product $product
     * @return RedirectResponse
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        try {
            $product->update($request->validated());
            flash('Продкут успешно изменён.')->success()->important();
            return Redirect::to($_SERVER['HTTP_REFERER']);
        } catch (\Throwable $e) {
            flash('Не удалось изменить продукт!')->error()->important();
            return Redirect::to($_SERVER['HTTP_REFERER']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Product $product
     * @return RedirectResponse
     */
    public function destroy(Product $product): RedirectResponse
    {
        try {
            $product->delete();
            flash('Продкут успешно удалён.')->success()->important();
            return Redirect::to($_SERVER['HTTP_REFERER']);
        } catch (\Throwable $e) {
            flash('Не удалось удалить продукт!')->error()->important();
            return Redirect::to($_SERVER['HTTP_REFERER']);
        }
    }
}
