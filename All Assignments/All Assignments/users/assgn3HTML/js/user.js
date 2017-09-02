// JavaScript source code
(function () {
    "use strict"
    //Variables
    var $tblUsers, $btnAdd, $UserFT, $txtName, $txtPhone, $txtEmail, $txtWebsite, $btnSave, $btnCancel, $popup,
        $overlay, $tr, userId, $hiddenUserId, $rowUsers;
    $tblUsers = $('#tblUser');
    $UserFT = $('#userFormTitle');
    $txtName = $('#txtName');
    $txtPhone = $('#txtPhone');
    $txtEmail = $('#txtEmail');
    $txtWebsite = $('#txtWebsite');
    $btnSave = $('#btnSave');
    $btnCancel = $('#btnCancel');
    $popup = $('#popup');
    $overlay = $('#overlay');
    $btnAdd = $('#btnAdd');
    $hiddenUserId = $('#hiddenUserId');
    $tr = $('tr');

    function init() {
        //debugger;
        $.ajax({
            url: 'http://jsonplaceholder.typicode.com/users',
            success: function (data) {
                $.each(data, function (index, user) {
                    console.log(user);
                    AddRow(user);
                })
            },
            error: function (data) {
                console.log("Something happened Wrong");
            }
        });

        //Add Events
        $(document).on('click', '[action=Edit]', EditUser);
        $(document).on('click', '[action=Delete]', DeleteUser);
        $btnAdd.bind('click', AddUser);
        $btnCancel.bind('click', AddUser);
        //$btnCancel.bind('click', CancelUser);
        $('form').on('click', '#btnSave', SaveUser);

    }

    function AddUser() {
        var user = {};

        user.id = 1 + parseInt($('tr:last-child').attr('userId'), 10);
        user.name = '';
        user.email = '';
        user.pnone = '';
        user.website = '';
        PreparePopup(user);
        TogglePopup();
        $UserFT.html('Add User');
    }

    function EditUser() {

        var user = {}, $selectedRow;
        $selectedRow = $(this).closest('tr');

        user.id = parseInt($selectedRow.attr('userId'), 10);
        user.name = $selectedRow.find('td:nth-child(2)').html();
        user.email = $selectedRow.find('td:nth-child(3)').html();
        user.phone = $selectedRow.find('td:nth-child(4)').html()

        user.website = $selectedRow.find('td:nth-child(5) a').html();
        PreparePopup(user);
        $UserFT.html('Edit User Form');
        TogglePopup();

    }
    function CancelUser() {
        TogglePopup();
    }
    function DeleteUser() {
        if (confirm("Sure are you want to delete the Item?")) {
            $(this).closest('tr').remove();
        }
    }

    function TogglePopup() {
        $popup.toggle();
        $overlay.toggle();
    }

    function SaveUser() {
        var user = {}, $row;
        user.id = parseInt($hiddenUserId.val(), 10);
        user.name = $txtName.val();
        user.email = $txtEmail.val();
        user.phone = $txtPhone.val();
        user.website = $txtWebsite.val();
        //if ($.trim(user.name) === "" && $.trim(user.email) === "") {
        //    alert("Name and Email are Mandatory fields");
        //    return;
        //}
        if (user.name && user.email) {
            $row = $('tr[userId=' + user.id + ']');
            if ($row.length > 0) {
                UpdateTr($row, user);
            }
            else {
                AddRow(user);
            }
            TogglePopup();
        }
        else {
            alert("Name and Email can't be empty");
        }
    }
    function UpdateTr($tr, user) {
        $tr.find('td:nth-child(2)').html(user.name);
        $tr.find('td:nth-child(3)').html(user.email);
        $tr.find('td:nth-child(4)').html(user.phone);
        //http is used for making it a link to open and target is also set to blank for opening in another page
        $tr.find('td:nth-child(5) a').html(user.website).attr('href', "http://" + user.website).attr('target', "_blank");;
    }
    function PreparePopup(user) {
        $hiddenUserId.val(user.id);
        $txtName.val(user.name);
        $txtPhone.val(user.phone);
        $txtEmail.val(user.email);
        $txtWebsite.val(user.website);
    }

    function AddRow(user) {
        $rowUsers = $tblUsers.find('tr:nth-child(2)').clone();
        $rowUsers.removeClass('hidden');
        $rowUsers.attr('userId', user.id);
        $rowUsers.find('td:nth-child(2)').html(user.name);
        $rowUsers.find('td:nth-child(3)').html(user.email);
        $rowUsers.find('td:nth-child(4)').html(user.phone);
        //http is used for making it a link to open and target is also set to blank for opening in another page
        $rowUsers.find('td:nth-child(5) a').html(user.website).attr('href', "http://" + user.website).attr('target', "_blank");
        $tblUsers.append($rowUsers);

    }
    //call function
    init();

    //return
})(jQuery);
