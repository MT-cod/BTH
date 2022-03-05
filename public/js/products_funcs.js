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
            var attrs = '';
            for (const [key, value] of Object.entries(JSON.parse(data.data))) {
                attrs += `${key}: ${value} <br>`;
            }
            $('#modal_product_show_data').html(attrs);
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

            let attrNum = 1;
            let attrs = ``;
            for (const [key, value] of Object.entries(JSON.parse(data.data))) {
                attrs += `<div class="text-white input-group" id="modal-product-edit-form-attr-${attrNum}" style="background: #3c4054">`;
                attrs += `<div class="">Название<p><input type="text" name="attrs[${attrNum}][name]" value="${key}"></p></div>`;
                attrs += `<div class="">Значение<p><input type="text" name="attrs[${attrNum}][value]" value="${value}"></p></div>`;
                attrs += `<div class=""><br><button type="button" onclick="$('#modal-product-edit-form-attr-${attrNum}').remove();" style="background-color: #3c4054">&#128465;</button></div></div>`;
                attrNum++
            }
            $('.btn-attr-input-add').attr('data-next_attr', attrNum);
            $('#modal_product_edit_data').html(attrs);

            $('#modal_product_edit_save').html('<button type="submit" class="btn btn-info btn-sm btn-block modal_edit_edit_save">Сохранить</button>');
            $('#modal-product-edit-form').attr('action', route);
            $('.modal-product-show').modal('hide');
            $('#modal_product_edit_save_results').html('');
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
            }
        });
    })
});
//Изменение продукта - end

//Создание продукта
$(document).on("click", ".btn-modal_goods_create", function () {
    $.ajax({
        url: '/goods/create',
        method: "get",
        success: function (data, textStatus, jqXHR) {
            $('.modal_goods_create_title').html('<b>Создание нового товара</b>');
            $('.modal_goods_create_category').html(
                `<select class="form-control" name="category_id">` +
                `${data.categories.map((cat) => {
                    return `<option value=${cat.id}>${cat.name}</option>`;
                }).join``}` +
                `</select>`
            );
            $('.modal_goods_create_additional_chars').html(
                `<div class="form-control" style="min-height: 20vh !important; max-height: 30vh !important; overflow-y: scroll !important;">` +
                `${data.additCharacteristics.map((char) => {
                    let res = `<div class="form-check">`;
                    res += `<input name="additChars[]" type="checkbox" class="form-check-input" id="additChar_${char.id}" value=${char.id}>`;
                    res += `<label class="form-check-label" for="additChar_${char.id}"><b>${char.name}</b> (${char.value})</label></div>`;
                    return res;
                }).join``}` +
                `</div>`
            );
            $('.modal_goods_create_results').html('');
            $('#modal-item-create').modal('show');
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }});
});

//Попытка сохранения нового продукта
$(document).ready(function () {
    $("#modal-item-create-form").submit(function (event) {
        // Отменяем стандартное поведение формы на submit.
        event.preventDefault();
        // Собираем данные с формы. Здесь будут все поля у которых есть `name`, включая метод `_method` и `_token`.
        let data = new FormData(this);
        // Отправляем запрос.
        $.ajax({
            method: 'POST', // начиная с версии 1.9 `type` - псевдоним для `method`.
            url: this.action, // атрибут `action="..."` из формы.
            cache: false, // запрошенные страницы не будут закешированы браузером.
            data: data, // больше ничего тут не надо!
            dataType: 'json', // чтобы jQuery распарсил `success` ответ.
            processData: false, // чтобы jQuery не обрабатывал отправляемые данные.
            contentType: false, // чтобы jQuery не передавал в заголовке поле `Content-Type` совсем.
            success: function (data) {
                location = data.referer;
            },
            error: function (data) {
                inModalErrorFlashing(data.responseJSON.errors, ".modal_goods_create_results")
            }
        });
    })
});
//Создание продукта - end

//Доп функции-------------------------------------------
function idsInArray(needleId, haystack)
{
    let length = haystack.length;
    for (let i = 0; i < length; i++) {
        if (haystack[i]['id'] == needleId) {
            return true
        }
    }
    return false;
}

//Добавление полей для нового атрибута продукта
$(document).on("click", ".btn-attr-input-add", function () {
    let attrNum = Number($(this).data('next_attr'));
    let attrs = '';
    attrs += `<div class="text-white input-group" id="modal-product-edit-form-attr-${attrNum}" style="background: #3c4054">`;
    attrs += `<div class="">Название<p><input type="text" name="attrs[${attrNum}][name]"></p></div>`;
    attrs += `<div class="">Значение<p><input type="text" name="attrs[${attrNum}][value]"></p></div>`;
    attrs += `<div class=""><br><button type="button" onclick="$('#modal-product-edit-form-attr-${attrNum}').remove();" style="background-color: #3c4054">&#128465;</button></div></div>`;
    attrNum++
    $('#modal_product_edit_data').append(attrs);
    $('.btn-attr-input-add').data('next_attr', attrNum);
});
