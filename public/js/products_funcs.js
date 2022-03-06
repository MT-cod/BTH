//Подключаем токен для запросов ajax
const csrf_token = $('meta[name="csrf-token"]').attr('content');
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': csrf_token
    }});

//Просмотр продукта
$(document).on("click", ".modal_product_show", function () {
    let id = $(this).data('id');
    let editRoute = $(this).data('edit_route');
    let deleteRoute = $(this).data('delete_route');
    $.ajax({
        url: '/products/' + id,
        method: "get",
        success: function (data, textStatus, jqXHR) {
            $('#modal_product_show_title').html('<h4 class="text-white"><b>' + data.name + '</b></h4>');
            $('#modal_product_show_article').html(data.article);
            $('#modal_product_show_name').html(data.name);
            $('#modal_product_show_status').html(data.status === "available" ? 'Доступен' : 'Недоступен');
            if (data.data) {
                var attrs = '';
                for (const [key, value] of Object.entries(JSON.parse(data.data))) {
                    attrs += `${key}: ${value} <br>`;
                }
                $('#modal_product_show_data').html(attrs);
            }
            $('#modal_product_edit_button').html('<button type="button" class="btn-modal_product_edit" data-id="' + id + '" data-route="' + editRoute + '" style="background-color: #3c4054; color: white;">&#9998;</button>');
            $('#modal_product_delete_form').attr("action", deleteRoute);
            $('.modal-product-show').modal('show');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Ошибка получения данных о продукте\n(' + errorThrown + ')');
        }});
});
//Просмотр продукта - end

//Изменение продукта
$(document).on("click", ".btn-modal_product_edit", function () {
    let id = $(this).data('id');
    let route = $(this).data('route');
    $.ajax({
        url: '/products/' + id,
        method: "get",
        success: function (data, textStatus, jqXHR) {
            $('#modal_product_edit_title').html('<h4 class="text-white"><b>Редактировать ' + data.name + '</b></h4>');
            $('#modal_product_edit_article').val(data.article);
            $('#modal_product_edit_name').val(data.name);

            let status = `<select class="form-control form-control-sm" name="status" id="modal_product_edit_status">`;
                if (data.status === "available") {
                    status += `<option selected="selected" value="available">Доступен</option>`;
                    status += `<option value="unavailable">Недоступен</option>`;
                } else {
                    status += `<option value="available">Доступен</option>`;
                    status += `<option selected="selected" value="unavailable">Недоступен</option>`;
                }
            status += `</select>`;
            $('#modal_product_edit_status').html(status);

            let attrNum = 0;
            if (data.data) {
                let attrs = ``;
                for (const [key, value] of Object.entries(JSON.parse(data.data))) {
                    attrs += `<div class="text-white input-group" id="modal-product-edit-form-attr-${attrNum}" style="background: #3c4054">`;
                    attrs += `<div class="">Название<p><input type="text" name="attrs[${attrNum}][name]" value="${key}" required></p></div>`;
                    attrs += `<div class="">Значение<p><input type="text" name="attrs[${attrNum}][value]" value="${value}" required></p></div>`;
                    attrs += `<div class=""><br><button type="button" onclick="$('#modal-product-edit-form-attr-${attrNum}').remove();" style="background-color: #3c4054">&#128465;</button></div></div>`;
                    attrNum++
                }
                $('#modal_product_edit_data').html(attrs);
            }
            $('.btn-attr-input-add').attr('data-next_attr', attrNum);
            $('.btn-attr-input-add').attr('data-action_factor', 'edit');

            $('#modal_product_edit_save').html('<button type="submit" class="btn btn-info btn-sm btn-block">Сохранить</button>');
            $('#modal-product-edit-form').attr('action', route);
            $('.modal-product-show').modal('hide');
            $('.modal-product-edit').modal('show');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Ошибка получения данных о продукте\n(' + errorThrown + ')');
        }});
});

//Попытка сохранения изменений продукта
$(document).ready(function () {
    $("#modal-product-edit-form").submit(function(event) {
        event.preventDefault();
        let data = new FormData(this);
        let attrDataCollector = {};
        let attrData = $('#modal-product-edit-form').serializeArray();
        let attrName = '';
        $.each(attrData, function () {
            if (this.name.includes('attrs') && this.name.includes('name')) {
                attrName = this.value;
                data.delete(this.name);
            }
            if (this.name.includes('attrs') && this.name.includes('value')) {
                attrDataCollector[attrName] = this.value;
                data.delete(this.name);
            }
        });
        data.append('data', JSON.stringify(attrDataCollector));

        $.ajax({
            method: 'POST',
            url: this.action,
            cache: false,
            data: data,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (data, textStatus, jqXHR) {
                location = data.referer;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Ошибка! Проверьте введённые данные.');
            }
        });
    })
});
//Изменение продукта - end

//Создание продукта
$(document).on("click", ".modal_product_create", function () {
    $('.btn-attr-input-add').attr('data-next_attr', 0);
    $('.btn-attr-input-add').attr('data-action_factor', 'create');

    $('#modal_product_create_save').html('<button type="submit" class="btn btn-info btn-sm btn-block">Сохранить</button>');
    $('.modal-product-create').modal('show');
});

//Попытка сохранения нового продукта
$(document).ready(function () {
    $("#modal-product-create-form").submit(function (event) {
        event.preventDefault();
        let data = new FormData(this);
        let attrDataCollector = {};
        let attrData = $('#modal-product-create-form').serializeArray();
        let attrName = '';
        $.each(attrData, function () {
            if (this.name.includes('attrs') && this.name.includes('name')) {
                attrName = this.value;
                data.delete(this.name);
            }
            if (this.name.includes('attrs') && this.name.includes('value')) {
                attrDataCollector[attrName] = this.value;
                data.delete(this.name);
            }
        });
        data.append('data', JSON.stringify(attrDataCollector));

        $.ajax({
            method: 'POST',
            url: this.action,
            cache: false,
            data: data,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (data, textStatus, jqXHR) {
                location = data.referer;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Ошибка! Проверьте введённые данные.');
            }
        });
    })
});
//Создание продукта - end

//Добавление полей для нового атрибута продукта
$(document).on("click", ".btn-attr-input-add", function () {
    let actionFactor = $(this).data('action_factor');
    let attrNum = Number($(this).data('next_attr'));
    let attrs = '';
    attrs += `<div class="text-white input-group" id="modal-product-${actionFactor}-form-attr-${attrNum}" style="background: #3c4054">`;
    attrs += `<div class="">Название<p><input type="text" name="attrs[${attrNum}][name]" required></p></div>`;
    attrs += `<div class="">Значение<p><input type="text" name="attrs[${attrNum}][value]" required></p></div>`;
    attrs += `<div class=""><br><button type="button" onclick="$('#modal-product-${actionFactor}-form-attr-${attrNum}').remove();" style="background-color: #3c4054">&#128465;</button></div></div>`;
    attrNum++
    $(`#modal_product_${actionFactor}_data`).append(attrs);
    $('.btn-attr-input-add').data('next_attr', attrNum);
});
