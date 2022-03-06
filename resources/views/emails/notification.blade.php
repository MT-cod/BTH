<!DOCTYPE html>
<html lang="ru">
    <head>
        <title>Новый продукт {{$product['name']}}</title>
    </head>
    <body>

        <strong>
            Уведомление о создании нового продукта:
            @foreach($product as $key => $val)
                <p>{{$key}}: {{$val}}</p>
            @endforeach
        </strong>

    </body>
</html>
