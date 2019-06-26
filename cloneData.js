/**
 * Name: Rajneesh Gautam (Web Developer)
 *
 * Instructions: Call $(selector).cloneData(options) on an element with a jQuery type selector
 * defined in the attribute "rel" tag. This defines the DOM element to copy.
 * @example: $('a.copy').cloneData({limit: 5}); // <a href="example.com" class="copy" rel=".phone">Copy Phone</a>
 *
 * @param: string	excludeSelector - A jQuery selector used to exclude an element and its children
 * @param: integer	limit - The number of allowed copies. Default: 0 is unlimited
 * @param: string	append - HTML to attach at the end of each copy. Default: remove link
 * @param: string	copyClass - A class to attach to each copy
 * @param: boolean	clearInputs - Option to clear each copies text input fields or textarea
 *
 */

(function($) {



    $.fn.cloneData = function(options) {

        let settings = jQuery.extend({
            parentSelector: "clone-item",
            excludeSelector: ".exclude",
            emptySelector: ".empty",
            copyClass: "clone-div",
            removeButton: "remove-item",
            append: '',
            clearInputs: true,
            limit: 0, // 0 = unlimited
            minimum: 1, // 0 = unlimited
            counterIndex: 1,
            select2InitIds: [],
            ckeditorIds: [],
        }, options);

        $(document).on('click', '.' + settings.removeButton, function(){
            if($('.' + settings.parentSelector).length > settings.minimum){
                $(this).parents('.'+settings.parentSelector).slideUp(function(){
                    if($('.' + settings.parentSelector).length > 1) {
                        $(this).remove();
                    }
                });
            }else{
                alert('You must have minimum ('+ settings.minimum + ') item.');
            }

        });

        settings.limit = parseInt(settings.limit);
        settings.counterIndex = $('.'+settings.parentSelector).length;

        // loop each element
        this.each(function() {

            // set click action
            $(this).click(function(){
                //var rel = $(this).attr('rel'); // rel in jquery selector format
                let counter = $('.'+settings.parentSelector).length;
                let counterIndex = settings.counterIndex++;

                // stop limit
                if (settings.limit != 0 && counter >= settings.limit){
                    return false;
                }

                let master = $('.'+settings.parentSelector + ":first");
                let parent = $(master).parent();

                let clone = $(master).clone().addClass(settings.copyClass).attr('data' , counterIndex).attr('style', 'display:none;').append(settings.append);
                //console.log(clone.html());
                //Remove Elements with excludeSelector
                if (settings.excludeSelector){
                    $(clone).find(settings.excludeSelector).remove();
                }

                //Empty Elements with emptySelector
                if (settings.emptySelector){
                    $(clone).find(settings.emptySelector).empty();
                }

                // Increment Clone IDs
                if ( $(clone).attr('id') ){
                    let newid = $(clone).attr('id') + (counter +1);
                    $(clone).attr('id', newid);
                }

                $(clone).find('label').each(function(index, item){
                    console.log($(this).parent('input').html());
                    $(this).html();
                });

                // Increment Clone Children IDs
                $(clone).find('[id]').each(function(){
                    $(this).attr('id', $(this).attr('id').replace(/.$/, counterIndex));
                });

                var heading_text = $('.'+settings.parentSelector + ':last').find('legend').text();
                var headingArray = heading_text.split(' ');

                if(headingArray.length > 0){
                    var heading_text = '';
                    $.each(headingArray, function(index, item){
                        var data = item.trim();
                        if(isNaN(data)){
                            heading_text += index == 0 ? '':' ';
                            heading_text += data;
                        }else if(!isNaN(data)){
                            heading_text += ' '+ (parseInt(data) + 1);
                        }
                    });
                }

                $(clone).find('legend').each(function(index, item){
                    $(this).html(heading_text);
                });

                $(clone).find('[name]').each(function(){
                    let newid = $(this).attr('name') + (counter + 1);
                    let name_array = $(this).attr('name').split("[");
                    let input_name = null;
                    if(name_array.length > 1){
                        input_name = name_array[0];
                    }else{
                        input_name = name_array[0].replace(new RegExp("[0-9]", "g"), counterIndex);
                    }

                    let words = newid.match(/[^[\]]+(?=])/g)
                    if (words) {
                        newid.replace(/\[(.+?)\]/g, function($0, $1) {
                            parent_index = !isNaN($1) ? counterIndex : $1;
                            input_name += '['+ parent_index +']';
                        })
                    }

                    //console.log('input_name', input_name);
                    $(this).attr('name', input_name);
                });

                //Clear Inputs/Textarea
                if (settings.clearInputs){
                    $(clone).find(':input').each(function(){
                        let type = $(this).attr('type');
                        switch(type)
                        {
                            case "button":
                                break;
                            case "reset":
                                break;
                            case "submit":
                                break;
                            case "checkbox":
                                $(this).attr('checked', false);
                                break;
                            case "radio":
                                $(this).attr('checked', false);
                                break;
                            default:
                                if(!$(this).hasClass('not_reset')){
                                    $(this).val("");
                                }
                        }
                    });

                    $(clone).find('input[type="file"]').each(function(e){
                        $(this).parents('.fileinput').find('.previewing').attr('src', SITE_CONSTANT['DEFAULT_IMAGE_ADMIN']);
                        $(this).parents('.fileinput').find('.fileinput-preview img').attr('src', SITE_CONSTANT['DEFAULT_IMAGE_ADMIN']);
                        $(this).parents('.fileinput').find('.check-file-remove').hide();
                        $(this).parents('.fileinput').find('.check-file-change').hide();
                        $(this).parents('.fileinput').find('.check-file-select').show();
                    });

                    $(clone).find('.select2-selection').each(function(){
                        $(clone).remove();
                    });

                    $(clone).find('.select2').each(function(){
                        if($(this).attr('id')){
                            settings.select2InitIds.push('#' + $(this).attr('id'));
                        }
                    });

                    $(clone).find('.ckeditor').each(function(){
                        if($(this).attr('id')){
                            settings.ckeditorIds.push($(this).attr('id'));
                        }
                    });
                }

                $('.' + settings.parentSelector + ':last').after(clone).ready(function () {
                    $('.'+ settings.parentSelector + ':last').slideDown(300, function(){
                        if (settings.select2InitIds.length > 0) {
                            //console.warn(settings.select2InitIds);
                            $.each(settings.select2InitIds, function (index, id) {
                                //console.log(id);
                                $(id).parent().find('.select2-container').remove();
                                $(id).select2({
                                    placeholder: "Select",
                                    width: "300px;",
                                    allowClear: true
                                })

                            });
                            settings.select2InitIds = [];
                        }

                        if (settings.ckeditorIds.length > 0) {
                            console.log(settings.ckeditorIds);
                            $.each(settings.ckeditorIds, function (index, id) {
                                CKEDITOR.replace(id);

                                var $ids = $('[id=cke_' + id + ']');
                                if ($ids.length > 0) {
                                    console.log($ids);
                                    $ids.remove();
                                }
                            });

                            settings.ckeditorIds = [];
                        }

                    });
                });
                return false;
            }); // end click action

        }); //end each loop

        return this; // return to jQuery
    };

})(jQuery);
