<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Little Explainers</title>
<link href="styles/main.css" rel="stylesheet" type="text/css" />
<link href='http://fonts.googleapis.com/css?family=PT+Sans' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>
</head>

<body style="margin:0;padding:0;background:#333" onload="init()">



<div id="main_container" style="margin:0px auto;width:800px;background:#444">
	<div class="header_txt" id="header" style="width:780px;height:38px;background:#000;padding-left:20px;padding-top:12px">
		LITTLE EXPLAINERS<span class="txt_ver">v1.0</span>
	</div>
    <div id="le_default_cont" style="width:800px;height:500px;background:#eeeeee">
		<div class="sub_head" style="position:relative;height:25px;background:#;padding-top:10px;padding-left:20px;padding-right:60px">
        Complete signup process
        </div>
        
        <div class="r_rect8" style="position:relative;width:500px;height:380px;background:#CCC;left:50%;top:50%;margin-left:-250px;margin-top:-230px;border:1px solid #999">
            
            <div id="alert_txt" class="txt_pop_alert r_rect3" style="background:#900;padding-left:10px;padding-top:5px;padding-bottom:5px;margin-top:10px;margin-left:20px;margin-right:20px;display:none">Alert message...</div>
            
            <div id="msg_txt" class="txt_pop_success" style="padding-top:10px;padding-left:20px">
                Validating signup token...
            </div>
            
            <div id="ok_btn" style="background:#;height:40px;padding-left:20px;padding-top:10px;display:none"><input class="submit_btn  r_rect3" type="button" value="OK" onclick="continueLogin()" /></div>
            
            <div id="pop_form" style="display:none">
                <div class="txt_pop_sub" style="background:#;height:18px;padding-left:20px"></div>
                <div class="txt_pop_sub" style="background:#;padding-left:130px;height:18px">User ID</div>
                <div style="background:#;height:40px;padding-left:130px"><input class="pop_form_txt" id="userid" name="userid" style="width:250px;height:22px" type="text" value="" onfocus="onPopFormTxtFocus()" onkeydown="onSignupEnterKey(event)" /></div>
                <div class="txt_pop_sub" style="background:#;padding-left:130px;height:18px">Password</div>
                <div style="background:#;height:45px;padding-left:130px"><input class="pop_form_txt" id="pwd" name="pwd" style="width:250px;height:22px" type="password" value="" onfocus="onPopFormTxtFocus()" onkeydown="onSignupEnterKey(event)" /></div>
                <div class="txt_pop_sub" style="background:#;padding-left:130px;height:18px">Confirm password</div>
                <div style="background:#;height:45px;padding-left:130px"><input class="pop_form_txt" id="cpwd" name="cpwd" style="width:250px;height:22px" type="password" value="" onfocus="onPopFormTxtFocus()" onkeydown="onSignupEnterKey(event)" /></div>
                <div style="background:#;height:40px;padding-left:130px"><input class="submit_btn  r_rect3" type="button" value="Submit" onclick="submitSignup()" /></div>
                
                <div id="signup_loader" style="position:relative;width:30px;left:220px;top:-38px;display:none"><img src="images/ajax-loader_CCCCCC_000000.gif" /></div>
            </div>
        </div>
        
        
    </div>
    
   
</div>
<form id="login_form" action="php/authenticate.php?cb=<?=time()  ?>" method="post" onsubmit="">
	<input id="uid_l" name="uid_l" style="width:250px;height:22px" type="hidden" value="" />
    <input id="pwd_l" name="pwd_l" style="width:250px;height:22px" type="hidden" value="" />
</form>
</body>

<script src="scripts/ls.js"></script>
<script src="scripts/config.js"></script>

<script language="javascript" src="scripts/jquery.js"></script>
<script language="javascript" src="scripts/jquery-cookie.js"></script>
<script language="javascript" src="scripts/jquery.form.js"></script>

<script language="javascript" src="scripts/jquery-ui.min.js"></script>
<script language="javascript" src="scripts/jquery.ui.touch-punch.js"></script>
<script language="JavaScript" type="text/javascript">

var signupID = '<?= $_GET['token'] ?>';
var uname;
var uemail;
var uID;
var pwd;

function continueLogin(){
	getObject('uid_l').value = uID;
	getObject('pwd_l').value = pwd;
	
	getObject('login_form').submit();
	}
function onPopFormTxtFocus(){
	$("#alert_txt").css('display', 'none');
	}
function onSignupComplete(data, stat, jqXHR){
	if(data.res.stat == 'SUCCESS'){
		
		$("#signup_loader").css('display', 'none');
		$("#pop_form").css('display', 'none');
		
		$("#ok_btn").css('display', 'block');
		
		$("#alert_txt").css('display', 'block');
		$("#alert_txt").css('background', '#060');
		$("#alert_txt").html('Signup completed successfully...!');
		
		$("#msg_txt").html('Hi ' + uname.toTitleCase() + ',<br><br>Your signup process is completed successfully. Login details are sent to ' + uemail + '. Click OK to login to Little Explainers');
		
		}
	else{
		$("#alert_txt").css('display', 'block');
		$("#alert_txt").html(data.res.msg);
		
		$("#signup_loader").css('display', 'none');
		}
	}

function onSignupCompleteError(err){
	$("#signup_loader").css('display', 'none');
	$("#alert_txt").css('display', 'block');
	$("#alert_txt").html('Signup not successfull, Please refresh page to retry...!');
	}
function onSignupEnterKey(e){
	if(window.event) // IE8 and earlier
		{
		keynum = e.keyCode;
		}
	else if(e.which) // IE9/Firefox/Chrome/Opera/Safari
		{
		keynum = e.which;
		}
	if(keynum == 13){
		submitSignup();
		}
	}
function submitSignup(){
	$("#alert_txt").css('display', 'none');
	
	if(!validateString(getObject("userid").value)){
		$("#alert_txt").css('display', 'block');
		$("#alert_txt").html('User ID cannot be empty...!');
		return;
		}
		
	if(!validateString(getObject("pwd").value)){
		$("#alert_txt").css('display', 'block');
		$("#alert_txt").html('Password cannot be empty...!');
		return;
		}
		
	if(!validateString(getObject("cpwd").value)){
		$("#alert_txt").css('display', 'block');
		$("#alert_txt").html('Confirm password cannot be empty...!');
		return;
		}
		
	if(getObject("pwd").value != getObject("cpwd").value){
		$("#alert_txt").css('display', 'block');
		$("#alert_txt").html('Password not same as confirm password...!');
		return;
		}
		
	$("#signup_loader").css('display', 'block');
	
	var dataobj = new Object();
	dataobj.action = 'SIGNUP_COMPLETE';
	dataobj.uid = uID = getObject("userid").value;
	dataobj.pwd = pwd = getObject("pwd").value;
	dataobj.uname = uname;
	dataobj.uemail = uemail;
	dataobj.signupID = signupID;
	
	$.ajax({
		type: "GET",
		url: getURL(),
		dataType: 'jsonp',
		data: formatData(dataobj),
		jsonp: 'jsoncallback',
		success: onSignupComplete,
		error : onSignupCompleteError,
		});
	}

function onValidate(data, stat, jqXHR){
	if(data.res.stat == 'SUCCESS'){
		uname = data.res.msg;
		uemail = data.res.msg2;
		
		$("#msg_txt").html('Hi ' + uname.toTitleCase() + ',<br><br>Please enter a user id and password with which you want to login to Little Explainers.');
		$("#pop_form").css('display', 'block');
		getObject("userid").value = '';
		getObject("userid").focus();
		}
	else{
		$("#alert_txt").css('display', 'block');
		$("#alert_txt").html(data.res.msg);
		
		$("#msg_txt").html('Click <a style="text-decoration:none" href="index.php">here</a> to return to Little Explainers');
		}
	}

function onValidateError(err){
	$("#alert_txt").css('display', 'block');
	$("#alert_txt").html('Validation not successfull, Please refresh page to retry...!');
	}

function init(){
	var dataobj = new Object();
	dataobj.action = 'VALIDATE_SIGNUP_TOKEN';
	dataobj.signupID = signupID;
	
	$.ajax({
		type: "GET",
		url: getURL(),
		dataType: 'jsonp',
		data: formatData(dataobj),
		jsonp: 'jsoncallback',
		success: onValidate,
		error : onValidateError,
		});
	}





</script>
</html>
