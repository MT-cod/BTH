@extends('layouts.app')

@section('content')

<!-- Scripts -->
{{--<script src="/js/products_funcs.js"></script>--}}

<!-- Styles -->
<link href="{{ asset('css/online_store_green.css') }}" rel="stylesheet">

<div class="container-fluid" style="background: whitesmoke">

    <div class="row justify-content-center" style="height: 4vh !important">
            <div class="col-11">
                @include('flash::message')
            </div>

            <div class="col-1">
                <button class="btn btn-info btn-sm btn-block modal_product_create">Добавить</button>
            </div>
    </div>

    <div class="row justify-content-center">
        @include('product.products_table')
    </div>

    <!-- Modals -->
    {{--@include('product.modal_product_show')
    @include('product.modal_product_edit')
    @include('product.modal_product_create')--}}
    <!-- Modals-end -->

</div>

@endsection
