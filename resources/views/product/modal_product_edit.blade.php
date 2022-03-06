<div class="modal fade modal-product-edit" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content" style="top: 4vh; left: calc(50vw - 50%); position: absolute; background: #3c4054">
            <form id="modal-product-edit-form" method="POST" action="" enctype="multipart/form-data">
                @csrf
                @method('PATCH')
                <div class="modal-header p-0">
                    <div class="col-11 pt-3 px-3">
                        <span class="" id="modal_product_edit_title"></span>
                    </div>
                    <div class="col-1 btn-group">
                        <button style="background-color: #3c4054; color: white;" type="button" onclick="$('.modal-product-edit').modal('hide');">X</button>
                    </div>
                </div>
                <div class="modal-body">
                    <p class="text-white" style="background: #3c4054">
                        <label for="modal_product_edit_article">Артикул</label>
                        <input class="form-control form-control-sm" id="modal_product_edit_article" type="text" name="article">
                    </p>
                    <p class="text-white" style="background: #3c4054">
                        <label for="modal_product_edit_name">Название</label>
                        <input class="form-control form-control-sm" id="modal_product_edit_name" type="text" name="name">
                    </p>
                    <p class="text-white" style="background: #3c4054">
                        <label for="modal_product_edit_status">Статус</label>
                        <span id="modal_product_edit_status"></span>
                    </p>
                    <h6 class="text-white"><b>Атрибуты</b></h6>
                    <span id="modal_product_edit_data"></span>
                    <a class="text-info btn-attr-input-add" data-next_attr="" data-action_factor="edit" href="#" style="font-size: .7rem;">+ Добавить атрибут</a>
                </div>
                <div class="p-3" id="modal_product_edit_save"></div>
            </form>
        </div>
    </div>
</div>
