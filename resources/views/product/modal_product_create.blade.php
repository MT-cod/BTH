<div class="modal fade modal-product-create" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content" style="top: 4vh; left: calc(50vw - 50%); position: absolute; background: #3c4054">
            <form id="modal-product-create-form" method="POST" action="{{route('products.store')}}" enctype="multipart/form-data">
                @csrf
                <div class="modal-header p-0">
                    <div class="col-11 pt-3 px-3">
                        <h4 class="text-white"><b>Добавить продукт</b></h4>
                    </div>
                    <div class="col-1 btn-group">
                        <button style="background-color: #3c4054; color: white;" type="button" onclick="$('.modal-product-create').modal('hide');">X</button>
                    </div>
                </div>
                <div class="modal-body">
                    <p class="text-white" style="background: #3c4054">
                        <label for="modal_product_create_article">Артикул</label>
                        <input class="form-control form-control-sm" id="modal_product_create_article" type="text" name="article">
                    </p>
                    <p class="text-white" style="background: #3c4054">
                        <label for="modal_product_create_name">Название</label>
                        <input class="form-control form-control-sm" id="modal_product_create_name" type="text" name="name">
                    </p>
                    <p class="text-white" style="background: #3c4054">
                        <label for="modal_product_create_status">Статус</label>
                        <select class="form-control form-control-sm" name="status" id="modal_product_create_status">
                            <option value="available">Доступен</option>
                            <option selected="selected" value="unavailable">Недоступен</option>
                        </select>
                    </p>
                    <h6 class="text-white"><b>Атрибуты</b></h6>
                    <span id="modal_product_create_data"></span>
                    <a class="text-info btn-attr-input-add" data-next_attr="" data-action_factor="create" href="#" style="font-size: .7rem;">+ Добавить атрибут</a>
                </div>
                <div class="p-3" id="modal_product_create_save"></div>
            </form>
        </div>
    </div>
</div>
