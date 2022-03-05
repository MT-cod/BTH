<div class="modal fade modal-product-show" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content" style="top: 4vh; left: calc(50vw - 50%); position: absolute; background: #3c4054">
            <div class="modal-header p-0">
                <div class="col-10 pt-3 px-3">
                    <span class="" id="modal_product_show_title"></span>
                </div>
                <div class="col-2 btn-group">
                    <div id="modal_product_edit_button"></div>
                    <form id="modal_product_delete_form" action="" method="POST">
                        @csrf
                        @method('DELETE')
                        <button type="submit" onclick="return confirm('Вы действительно хотите удалить продукт?')" style="background-color: #3c4054">&#128465;</button>
                    </form>
                    <button style="background-color: #3c4054; color: white;" type="button" onclick="$('.modal-product-show').modal('hide');">X</button>
                </div>
            </div>
            <div class="modal-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" style="background: #3c4054">
                        <div class="row">
                            <div class="col-2">
                                <p class="text-white">Артикул</p>
                                <p class="text-white">Название</p>
                                <p class="text-white">Статус</p>
                                <p class="text-white">Атрибуты</p>
                            </div>
                            <div class="col-10">
                                <p><b><span class="text-white" id="modal_product_show_article"></span></b></p>
                                <p><b><span class="text-white" id="modal_product_show_name"></span></b></p>
                                <p><b><span class="text-white" id="modal_product_show_status"></span></b></p>
                                <p><b><span class="text-white" id="modal_product_show_data"></span></b></p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
