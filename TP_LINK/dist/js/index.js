define(['jquery',['jquery-cookie']],function($){
	function index(){
		 $(function(){
            var banner_index = 1;
           
            $('.img_btn').on("click","li",function(event){
            	// alert(1);
            	clearInterval(Bannertimer);
                event.preventDefault();
                $('.img-box img').css('display','none');
                $('.img-box .img'+$(this).html()).fadeIn(500);
                $('.img-btn li').css('background','black');
                $(this).css('background','red');
                banner_index = $(this).html();
                // document.title = banner_index + "asd" +$(this).html();
                BannertimerStart();

             	
            })                    
            // document.title = banner_index + "asd" +$(this).html();
            //  $('.banner').mouseenter(function(){
            //     clearInterval(Bannertimer);
            // })
            // $('.banner').mouseleave(function(){
            //     BannertimerStart();
            // })
            var Bannertimer = null;
            var BannertimerStart = function(){
                Bannertimer = setInterval(function(){
                    banner_index++;
                    // document.title = banner_index;
                    if(banner_index == 7){
                        banner_index = 1; 
                    }
                    $('.img-box img').fadeOut(300);
                    $('.img-box .img'+ banner_index).fadeIn(500);
            
                    $('.img_btn li').css('background','black');
                    $('.img_btn li:nth-child(' + banner_index + ')').css('background','white');
                },3000)
            }
            BannertimerStart();
        })
		 $(function(){

			// 切换注册与登陆
			$("#loginbox").hide();
			$("#t_close").click(function(){
				$("#loginbox").hide();
			})
			$("#r_login").click(function(ev){
				ev.preventDefault();
				$("#loginbox").show();
				$("#loginbox").find("#bottom2").hide();
				$("#loginbox").find("#bottom1").show();
				$("#t_one2").html("TP-LINK会员注册").attr("class", "t_one active");
				$("#t_one1").html(`<span>TP-LINK会员登录</span><i>请完成登录后进行购物车相关操作</i>`).attr("class", "t_one");
				$("#t_one1").click(function(){
					$("#t_one2").html("TP-LINK会员注册").attr("class", "t_one active");
					$("#t_one1").html(`<span>TP-LINK会员登录</span>
							<i>请完成登录后进行购物车相关操作</i>`).attr("class", "t_one");
					$(".bottom").css("display", "none");
					$("#bottom1").css("display", "block");
				})
				$("#t_one2").click(function(){
					$("#t_one1").html("TP-LINK会员登录").attr("class", "t_one active");
					$("#t_one2").html(`<span>TP-LINK会员注册</span>
							<i>请完成注册后进行购物车相关操作</i>`).attr("class", "t_one");
					$(".bottom").css("display", "none");
					$("#bottom2").css("display", "block");
				})
			})



			// (注册)手机号码验证
			$(".bottom2").find("img").css("display","none");
			$(".bottom2").find(".speciall").css("display","none");
			$(".button1").click(function(){
				$("#btn_phone").val("");
					
			})
			$(".btn_phone").blur(function(){
				if($("#btn_phone").val().length != 11){
					$("#warnbox1").html(`<i class="warn"><img src="../images/home/pp.png" alt="">请输入正确的手机号码</i>`);
					$(".bottom2>div").find(".1").css("display","none");
				}else{
					var str = `phone=${$("#btn_phone").val()}`;
					$.ajax({
						method:"get",
						url:"../jquery/login.php?type=phone",
						data:str,
						success:function(data){
							if(data == 1){
								$("#warnbox1").html(`<i class="warn"><img src="../images/home/pp.png" alt="">手机号码已存在</i>`);
								$(".bottom2>div").find(".1").css("display","none");
							}else{
								$(".bottom2>div").find(".1").css("display","block");
							}
						},
						error:function(msg){
							alert(msg);
						}
					})
					$("#warnbox1").html("");
				}
			})

			// 邮箱验证
			$(".button2").click(function(){
				$("#btn_email").val("");
			})
			$(".btn_phone1").blur(function(){
				if(!/^\w+@(qq|163|162)\.com$/.test($("#btn_email").val())){
					$("#warnbox2").html(`<i class="warn"><img src="../images/home/pp.png" alt="">请输入正确的邮箱</i>`);
					$(".bottom2>div").find(".2").css("display","none");
				}else{
					var str1 = `email=${$("#btn_email").val()}`;
					$.ajax({
						method:"get",
						url:"../jquery/login1.php?type=email",
						data:str1,
						success:function(data){
							if(data == "1"){
								$("#warnbox2").html(`<i class="warn"><img src="../images/home/pp.png" alt="">邮箱已存在</i>`);
								$(".bottom2>div").find(".2").css("display","none");
							}else{
								$(".bottom2>div").find(".2").css("display","block");
							}
						},
						error:function(msg){
							alert(msg);
						}
					})
					$("#warnbox2").html("");
				}	
			})

			// 密码验证
			$(".btn_pwd").blur(function(){
				var m = $(".btn_pwd").val().length;
				if(m < 8 || m > 40){
					$("#warnbox3").html(`<i class="warn"><img src="../images/home/pp.png" alt="">请输入由8-40个字符组成，须含字母和数字的密码</i>`);
					$(".bottom2>div").find(".3").css("display","none");
				}else if(!/^\d+[a-zA-Z]+$/.test($(".btn_pwd").val())){
					$("#warnbox3").html(`<i class="warn"><img src="../images/home/pp.png" alt="">请输入由8-40个字符组成，须含字母和数字的密码</i>`);
					$(".bottom2>div").find(".3").css("display","none");
					
				}else{
					$(".bottom2>div").find(".3").css("display","block");
					$("#warnbox3").html("");
					
				}
			})

			// 再次确认密码
			$(".btn_pwd1").blur(function(){
				if($(".btn_pwd1").val() != $(".btn_pwd1").val()){
					$("#warnbox4").html(`<i class="warn"><img src="../images/home/pp.png" alt="">两次输入的密码不一致 </i>`);
					$(".bottom2>div").find(".4").css("display","none");
				}else{
					$(".bottom2>div").find(".4").css("display","block");
					$("#warnbox4").html("");
				}
			})


			// 注册提交数据
			$("#b_sub").click(function(){
				var str = `phone=${$("#btn_phone").val()}&email=${$("#btn_email").val()}&password=${$(".btn_pwd").val()}`;
				$.ajax({
						method:"post",
						url:"../jquery/login0.php",
						data:str,
						success:function(data){
							if(data){
								alert("注册成功");
								$("#loginbox").hide();
							}
						},
						error:function(msg){
							alert(msg);
						}
				})
			})


			// 登录
			$("#d_btn").click(function(){
				var str = `user=${$("#d_user").val()}&password=${$("#d_pwd").val()}`;
				$.ajax({
						method:"post",
						url:"../jquery/login2.php",
						data:str,
						success:function(data){
							if(!data){
								$("#warnbox5").html(`<i class="warn"><img src="../images/home/pp.png" alt="">账号密码错误</i>`);
							}else{
								$("#warnbox5").html("");
								alert("登录成功");
								$("#loginbox").hide();
							}
						},
						error:function(msg){
							alert(msg);
						}
				})
			})
			
		})

	}
	$(function(){
		$(".sidenavleft div,.sidenav1 ").mouseenter(function(){
			$(".sidenav1").css("display","block")
		})
	
		$(".sidenav1 ").mouseout(function(){
			$(".sidenav1").css("display","none")
		})
		// $().click(function(){
		// 	location.herf("");
		// })
		// $.cookie("goods","")
	})
	return {
		index: index
	}

})