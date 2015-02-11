function modifyHeight(selector){
    $(selector).each(function (index, Element) {
        var cell_array = new Array(2);
        var cell_height = 0;
        $(this).find(".cell").each(function (index, Element) {
            var val_cell = ($(this).height.length > 0) ? $(this).height() : 0;
            cell_array[index] = val_cell;
        });
        cell_height = Math.max.apply( Math, cell_array );
        $(this).find(".cell").css("height", cell_height);
    });
}
$(document).ready(function () {
    //Script para poner las celdas del mismo alto

	// Script para cambiar el estilo de los input radio y checkboxes
    if ($(".label-radio").length) {
        $('.label-radio input:checked').each(function(){ 
            //$(this).parent('label').addClass('radio-checked');
        });
    }
    if ($(".label-checkbox").length) {
        $('.label-checkbox input:checked').each(function(){ 
            $(this).parent('label').addClass('checkbox-checked');
        });
    }
    $(document).on("change", ":checkbox", function(){
        if ($(this).is(':checked')) {
            $(this).parent('.label-checkbox').find(':checkbox').attr('checked', true);
            $(this).parent('.label-checkbox').addClass('checkbox-checked');
        } else {
            $(this).parent('label').find(':checkbox').attr('checked', false);
            $(this).parent('label').removeClass('checkbox-checked');
        }
    });
    $(document).on("click", ".label-radio", function(){
        if ($(this).hasClass('radio-checked')) {
            $(this).find(':radio').attr('checked', true);
            $(this).addClass("radio-checked");
        } else {
            $(".label-radio").removeClass("radio-checked");
            $(".label-radio").find(':radio').attr('checked', false);
            $(this).find(':radio').attr('checked', true);
            $(this).addClass("radio-checked");
        }
    });
});