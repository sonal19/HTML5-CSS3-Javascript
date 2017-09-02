// JavaScript source code
(function () {
    //Variables
    var $tblUsers, $btnAdd, $UserFormTitle, $txtName, $txtPhone, $txtEmail, $txtWebsite, $btnSave, $btnCancel, $popup, $overlay, $tr, userId;
    $tblUsers = $('#tblUser');
    $UserFormTitle = $('#UserFormTitle');
    $txtName = $('#txtName');
    $txtPhone = $('#txtPhone');
    $txtEmail = $('#txtEmail');
    $txtWebsite = $('#txtWebsite');
    $btnSave = $('#btnSave');
    $btnCancel = $('#btnCancel');
    $popup = $('#popup');
    $overlay = $('#overlay');
    $btnAdd = $('#btnAdd');
    $tr = $('<tr />');
    userId = -1;


    //functions
    //debugger;
    function init() {
        //debugger;
        $.ajax({
            url: 'http://jsonplaceholder.typicode.com/users',
            success: function (data) {
                $.each(data, function (index, user) {
                    console.log(user);
                    var tr = '<tr><td prop="actions"><span action="Edit">Edit</span> | <span action="Delete">Delete</span></td>'
                        + ' <td prop="name">' + user.name + ' </td>' 
                    +' <td prop="email">' + user.email + ' </td>' 
                    +' <td prop="phone">' + user.phone + ' </td>' 
                    +' <td prop="website">' + user.website + ' </td></tr>';
                    $tblUsers.append(tr);
                })
            }
        });

        //Add Events

        $(document).on('click', '[action=Edit]', EditUser);
        $(document).on('click', '[action=Delete]', DeleteUser);
        $btnAdd.bind('click', AddUser);
        $btnCancel.bind('click', AddUser);
        $(document).on('click', '[action=Save]', SaveUser);
        $(document).on('click', '[action=Edit]', EditUser);
    }

    function AddUser() {
        TogglePopup();
        $UserFormTitle.html('Add User');
        userId = -1;//max
        PreparePopup($tr);
    }

    function EditUser() {
        PreparePopup($(this).closest('tr'));

        $UserFormTitle.html('Edit User');
        userId = parseInt($(this).closest(tr).attr('userId'), 10)
        TogglePopup();
    }
    function DeleteUser() {
        if (confirm("Sure are you want to delete?")) {
            $(this).closest('tr').remove();
        }
    }

    function TogglePopup() {
        //$popup.toggle();
        $overlay.toggle();
    }

    function SaveUser() {
        var user = {};
        user.name = $txtName.val();
        user.name = $txtName.val();
        user.name = $txtName.val();
        user.name = $txtName.val();

        if (userId == -1) {
            user.userID = $('[userId]').each(function (idx, item) {
                if (parseInt($(this).attr('userId', 10) > user.userID)) {
                    //user.userID=parseInt($(this).attr('');
                }
            });
            AddRow(user);
        }
        else {
            var $row = $('tr[userID=' + userId + ']');

            $row.find('[prop=name]').html(user.name);
            $row.find('[prop=name]').html(user.name);
            $row.find('[prop=name]').html(user.name);
            $row.find('[prop=name]').html(user.name);

        }

        TogglePopup();
    }

    function PreparePopup($tr) {
        $txtName.val($tr.find('[prop=name]').html());
        $txtPhone.val($tr.find('[prop=phone]').html());
        $txtEmail.val($tr.find('[prop=email]').html());
        $txtWebsite.val($tr.find('[prop=website]').html());
    }

    function AddRow(user) {
        var $trnew = $tr.clone;
        $trnew.attri('UserId=');
        $trnew.find('td[prop=name]').html(user.name);
        $trnew.find('td[prop=email]').html(user.email);
        $trnew.find('td[prop=phone]').html(user.name);
        $trnew.find('td[prop=website]').html(user.name);
        $tblUsers.append($trnew);
    }
    //call function
    init();

    //return
})();
