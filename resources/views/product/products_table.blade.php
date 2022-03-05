<div class="col" style="height: 90vh !important; overflow-y: auto;">
    <table class="table table-hover mx-auto">
        <thead>
            <tr>
                <th scope="col">АРТИКУЛ</th>
                <th scope="col">НАЗВАНИЕ</th>
                <th scope="col">СТАТУС</th>
                <th scope="col">АТРИБУТЫ</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($data as $product)
                <tr
                    class="clickableRow modal_product_show"
                    data-id="{{$product['id']}}"
                    data-edit_route="{{route('products.update', $product['id'])}}"
                    data-delete_route="{{route('products.destroy', $product['id'])}}"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Нажать для подробностей/изменения"
                >
                    <td>{{ $product['article'] }}</td>
                    <td>{{ $product['name'] }}</td>
                    <td>{{ ($product['status'] === "available") ? 'Доступен' : 'Недоступен'}}</td>
                    <td>{{ implode("\n", array_map(
                        static fn ($key, $val) => $key . ': ' . $val,
                        array_keys(json_decode($product['data'], true)),
                        json_decode($product['data'], true)
                        )) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
