/**
 * Instructions: Call $(selector).cloneData(options) on an element with a jQuery type selector
 * defined in the attribute "rel" tag. This defines the DOM element to copy.
 *
 * @CreadtedBY Name: Rajneesh Gautam (Web Developer)
 * @CreadtedOn 24/07/2019
 *
 * @example: 
        $('a#add-education').cloneData({
            mainContainerId: 'main-container', // Main container Should be ID
            cloneContainer: 'clone-container', // Which you want to clone 
            removeButtonClass: 'remove-education', // Remove button for remove cloned HTML 
            minLimit: 1, // Default 1 set minimum clone HTML required
            maxLimit: 5, // Default unlimited or set maximum limit of clone HTML
            append: '<div>Hi i am appended</div>', // Set extra HTML append to clone HTML
            excludeHTML: ".exclude", // remove HTML from cloned HTML
            init: function() {
                console.info(':: Initialize Plugin ::');
            },
            beforeRender: function() {
                console.info(':: Before rendered callback called');
            },
            afterRender: function() {
                console.info(':: After rendered callback called');
            },
            afterRemove: function() {
                console.warn(':: After remove callback called');
            },
            beforeRemove: function() {
                console.warn(':: Before remove callback called');
            }
        });
 *
 * @param: string	excludeHTML - A jQuery selector used to exclude an element and its children
 * @param: integer	limit - The number of allowed copies. Default: 0 is unlimited
 * @param: string	append - HTML to attach at the end of each copy. Default: remove link
 * @param: string	copyClass - A class to attach to each copy
 * @param: boolean	clearInputs - Option to clear each copies text input fields or textarea
 *
 */

(function($) {

    $.fn.cloneData = function(options) {

        let settings = jQuery.extend({
            mainContainerId: "clone-container",
            cloneContainer: "clone-item",
            excludeHTML: ".exclude",
            emptySelector: ".empty",
            copyClass: "clone-div",
            removeButtonClass: "remove-item",
            append: '',
            cloneHtml: null,
            clearInputs: true,
            limit: 0, // 0 = unlimited
            minimum: 1, // 0 = unlimited
            counterIndex: 0,
            select2InitIds: [],
            ckeditorIds: [],
        }, options);

        //settings.limit = parseInt(settings.limit);
        settings.counterIndex = $('.' + settings.cloneContainer + '.' + settings.copyClass).length;

        /* Remove all extra attribute and plugin data from cloned HTML*/
        $(options).each(function(index, option){
            let master = $('#' + settings.mainContainerId + ":first");

            /* html clone and store in a variable */
            settings.cloneHtml = $(master).clone();
            $(settings.cloneHtml).find('.' + settings.cloneContainer).addClass(settings.copyClass).attr('data' , settings.counterIndex).attr('style', 'display:none;').append(settings.append);

            /* Remove chosen extra html */
            $(settings.cloneHtml).find('.chosen-container').each(function(){
                $(this).remove();
            });

            $(settings.cloneHtml).find('.select2-container').remove();

            //Remove Elements with excludeHTML
            if (settings.excludeHTML){
                $(settings.cloneHtml).find(settings.excludeHTML).remove();
            }

            //Empty Elements with emptySelector
            if (settings.emptySelector){
                $(settings.cloneHtml).find(settings.emptySelector).empty();
            }

            /* Reset field values if required */
            $(settings.cloneHtml).find(':input').each(function(){
                let type = $(this).attr('type');

                switch(type){
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
                        if(!$(this).hasClass('retain-value')){
                            $(this).val("");
                        }
                }
            });


            /* All ckeditor id store for reinitialize after render */
            $(settings.cloneHtml).find('.ckeditor').each(function(){
                if($(this).attr('id')){
                    settings.ckeditorIds.push($(this).attr('id'));
                }
            });

            /* html remove after store and remove extra HTML */

            $('.' + option.cloneContainer).remove();
            //console.log($(settings.cloneHtml).html());
        });

        $(document).on('click', '.' + settings.removeButtonClass, function(){
            if($('.' + settings.cloneContainer).length > settings.minimum){
                $(this).parents('.'+settings.cloneContainer).slideUp(function(){
                    //if($('.' + settings.cloneContainer).length > 1) {
                        $(this).remove();
                    //}
                });
            }else{
                alert('You must have minimum ('+ settings.minimum + ') item.');
            }

        });

        // loop each element
        this.each(function() {

            // set click action
            $(this).click(function(){
                //var rel = $(this).attr('rel'); // rel in jquery selector format
                let counter = $('.' + settings.cloneContainer + '.' + settings.copyClass).length;

                // stop append HTML if limit exceed
                if (settings.limit != 0 && counter >= settings.limit){
                    alert('cannot add more inputs.');
                    return false;
                }

                let clone = settings.cloneHtml;

                // Increment Clone IDs
                if ( $(clone).attr('id') ){
                    let newid = $(clone).attr('id') + (counter +1);
                    $(clone).attr('id', newid);
                }

                $(clone).find('label').each(function(index, item){
                    //console.log($(this).parent('input').html());
                    $(this).html();
                });

                // Increment Clone Children IDs
                $(clone).find('[id]').each(function(){
                    $(this).attr('id', $(this).attr('id').replace(/.$/, settings.counterIndex));
                });

                $(clone).find('[for]').each(function(){
                    $(this).attr('for', $(this).attr('for').replace(/.$/, settings.counterIndex));
                });

                let heading_text = $('.' + settings.cloneContainer + ':last').find('legend').text();
                let headingArray = heading_text.split(' ');

                if(headingArray.length > 0){
                    heading_text = '';
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
                        input_name = name_array[0].replace(new RegExp("[0-9]", "g"), settings.counterIndex);
                    }

                    let words = newid.match(/[^[\]]+(?=])/g)
                    if (words) {
                        newid.replace(/\[(.+?)\]/g, function($0, $1) {
                            parent_index = !isNaN($1) ? settings.counterIndex : $1;
                            input_name += '['+ parent_index +']';
                        })
                    }

                    //console.log('input_name', input_name);
                    $(this).attr('name', input_name);
                });

                //Clear Inputs/Textarea
                if (settings.clearInputs){

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


                $('#' + settings.mainContainerId).append($(clone).attr('data' , settings.counterIndex).html()).ready(function(){

                    /* Add data index into clone div */
                    $(this).find('.' + settings.cloneContainer+':last').attr('data' , settings.counterIndex);

                    /* Append cloned HTML */
                    $('.' + settings.cloneContainer).slideDown(400, function(){

                        /* Initialize again chosen dropdown after render HTML */
                        $('.select-chosen').each(function(){
                            $(this).chosen().trigger('chosen:update');
                        });

                        if (settings.select2InitIds.length > 0) {
                            //console.warn(settings.select2InitIds);
                            $.each(settings.select2InitIds, function (index, id) {
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

                        if(typeof $.material !== 'undefined') {
                            $.material.init();
                        }

                    });
                });

                settings.counterIndex++;
                return false;
            }); // end click action

        }); //end each loop

        return this; // return to jQuery
    };

})(jQuery);
