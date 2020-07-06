
![Clone Form Preview](https://github.com/rajneeshgautam/clone-html-from/blob/master/example.png)


Demo
-----

* [Advance Form Demo](http://plugin.examruler.com/dynamic-form).
* [Basic Form Demo](http://plugin.examruler.com/dynamic-form/basic-form.html).




```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/3.3.2/select2.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/select2/3.3.2/select2.css">
<script src="cloneData.js" type="text/javascript"></script>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">


<div class="container">
    <h3>NOTE: If you are using any third party plugin then you must add following class to initiate.</h3>
    <ol>
        <li>Bootstrap Datepicker: add class into input "<span class="text-danger">datepicker-init</span>"</li>
        <li>Ckeditor: add class into input "<span class="text-danger">ckeditor-init</span>"</li>
        <li>Select2: add class into input "<span class="text-danger">select2-init</span>"</li>
        <li>Chosen Dropdown: add class into input "<span class="text-danger">chosen-init</span>"</li>
    </ol>


    <div class="margin-t-md">
        <div class="customer-form">
            <h3>Dynamic Form</h3>
            <form id="" action="submit.php" method="post" role="form" autocomplete="off">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="control-label" for="customer-first_name">First name</label>
                            <input type="text" id="customer-first_name" class="form-control" name="Customer[first_name]"
                                   maxlength="32" aria-required="true" placeholder="Rajneesh">
                            <p class="help-block help-block-error"></p>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="control-label" for="customer-last_name">Last name</label>
                            <input type="text" id="customer-last_name" class="form-control" name="Customer[last_name]"
                                   maxlength="64" aria-required="true" placeholder="Gautam">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="control-label" for="customer-email">Email</label>
                            <input type="text" id="customer-email" class="form-control" name="Customer[email]"
                                   maxlength="32" aria-required="true" placeholder="rajneeshgautam24@gmail.com">

                            <p class="help-block help-block-error"></p>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="control-label" for="customer-mobile">Mobile</label>
                            <input type="text" id="customer-mobile" class="form-control" name="Customer[mobile]" placeholder="9935723456">
                        </div>
                    </div>
                </div>

                <div id="main-container">
                    <div class="panel panel-default">

                        <div class="panel-body container-item">
                            <fieldset class="item panel panel-default" style="border: 1px solid black; padding: 10px;">
                                <!-- widgetBody -->
                                <legend style="width: auto;padding:10px;">Address: 1</legend>
                                <div class="panel-body">
                                    <div class="form-group">
                                        <label class="control-label" for="full_name_0">Full Name</label>
                                        <input type="text" id="full_name_0" class="form-control"
                                               name="Address[0][full_name]" maxlength="128" placeholder="Full Name">
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label class="control-label" for="address_line_one_0">Address line
                                                    1</label>
                                                <input type="text" id="address_line_one_0" class="form-control"
                                                       name="Address[0][address_line1]" placeholder="Address Line 1">
                                                <p class="help-block help-block-error"></p>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label class="control-label" for="city_0">City</label>
                                                <input type="text" id="city_0" class="form-control"
                                                       name="Address[0][city]" maxlength="64">
                                                <p class="help-block help-block-error"></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label class="control-label" for="customer-startdate_0">Start Date</label>
                                                <input type="text" id="customer-startdate_0" class="form-control datepicker-init" name="Address[0][startdate]">
                                            </div>
                                        </div>

                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label class="control-label" for="state_0">State</label>

                                                <select id="state_0" class="form-control select2-init" name="Address[0][state]">
                                                    <option value="" data-select2-id="2">Select a state ...</option>
                                                    <optgroup label="Alaskan/Hawaiian Time Zone">
                                                        <option value="AK">Alaska</option>
                                                        <option value="HI">Hawaii</option>
                                                    </optgroup>
                                                    <optgroup label="Pacific Time Zone">
                                                        <option value="CA">California</option>
                                                        <option value="NV">Nevada</option>
                                                        <option value="OR">Oregon</option>
                                                        <option value="WA">Washington</option>
                                                    </optgroup>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <textarea name="Address[0][desc]" id="desc_0" class="ckeditor-init"
                                                          rows="5" cols="80"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div>
                                                <a href="javascript:void(0)"
                                                   class="remove-item btn btn-sm btn-danger remove-social-media">Remove</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>

                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-6">
                        <a href="javascript:;" class="pull-right btn btn-success btn-xs" id="add-more"><i class="fa fa-plus"></i>
                            Add more address</a>
                        <div class="clearfix"></div>
                    </div>

                    <div class="col-sm-6">
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>


            </form>
        </div>
    </div>
</div>


<script>
    $('a#add-more').cloneData({
        mainContainerId: 'main-container', // Main container Should be ID
        cloneContainer: 'container-item', // Which you want to clone
        removeButtonClass: 'remove-item', // Remove button for remove cloned HTML
        removeConfirm: true, // default true confirm before delete clone item
        removeConfirmMessage: 'Are you sure want to delete?', // confirm delete message
        //append: '<a href="javascript:void(0)" class="remove-item btn btn-sm btn-danger remove-social-media">Remove</a>', // Set extra HTML append to clone HTML
        minLimit: 2, // Default 1 set minimum clone HTML required
        maxLimit: 5, // Default unlimited or set maximum limit of clone HTML
        defaultRender: 1, // Number of clone items rendered by default 
        init: function () {
            console.info(':: Initialize Plugin ::');
        },
        beforeRender: function () {
            console.info(':: Before rendered callback called');
        },
        afterRender: function () {
            console.info(':: After rendered callback called');
        },
        afterRemove: function () {
            console.warn(':: After remove callback called');
        },
        beforeRemove: function () {
            console.warn(':: Before remove callback called');
        }
    });

    $('.select2').select2({
        placeholder: 'Select a month'
    });
</script>
```
