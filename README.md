# clone-html
Clone HTML Form Inputs

<blockquote>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <!--<script src="cloneData.js" type="text/javascript"></script>-->
    <script src="path/of/cloneData.js" type="text/javascript"></script>
    <fieldset id="main-container">

        <div class="clone-container">
            <select class="" id="input_name_0" name="player[input_name][0][slug]">
                <option value="">Select</option>
                <option value="facebook">Facebook</option>
                <option value="twitter">Twitter</option>
                <option value="youtube">Youtube</option>
                <option value="pinterest">Pinterest</option>
                <option value="instagram">Instagram</option>
                <option value="google">Google</option>
                <option value="LinkedIn">Linked In</option>
            </select>
            
            <input type="text" data-rule-url="true" id="url_0" class="form-control" name="player[wep_social_links][0][url]">

            <a href="javascript:void(0);" class="remove-item pull-right btn custom-danger" title="Remove field">
                <i class="fa fa-remove"></i>
            </a>
        </div>

    </fieldset>
    <a href="javascript:void(0);" id="add-more" title="Add field">Add More Link</a>

    <script>
        $('a#add-more').cloneData({
            mainContainerId: 'main-container',
            cloneContainer: 'clone-container',
            removeButtonClass: 'remove-education',
            minimum: 1,
            limit: 5,
        });
    </script>
</blockquote>
