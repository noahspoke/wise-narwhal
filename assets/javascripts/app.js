var $ = require('jquery');
var Slideout = require('slideout');
var swal = require('sweetalert');

$(function() {
	$(".page-heading").click(function() {
		var id = $(this).data("id");
		var childI = $(this).find("i");

		if (childI.hasClass("fa-plus")) {
			childI.removeClass("fa-plus");
			childI.addClass("fa-minus");
			$("#content-"+id).slideToggle(100);
		}
		else if (childI.hasClass("fa-minus")) {
			childI.removeClass("fa-minus");
			childI.addClass("fa-plus");
			$("#content-"+id).slideToggle(100);
		}
		else if (childI.hasClass("fa-caret-down")) {
			childI.removeClass("fa-caret-down");
			childI.addClass("fa-caret-up");
			//other stuff toggle
		}
		else if (childI.hasClass("fa-caret-up")) {
			childI.removeClass("fa-caret-up");
			childI.addClass("fa-caret-down");

		}

		
	});

	$(".input-switch").focus(function() {
		var the_form = $(this).parent("form");
		toggleSwitches(the_form);
	});

	$(".input-switch").focusout(function() {
		var the_form = $(this).parent("form");
		toggleSwitches(the_form);
	});

	function toggleSwitches(parent) {
		parent.find(".thing-button").toggle();
		parent.find(".element-switch").toggle();
	}


	$('textarea').each(function () {
	  this.setAttribute('style', 'overflow-y:hidden;');
	}).on('input', function () {
	  this.style.height = 'auto';
	  this.style.height = (this.scrollHeight - ($(this).css('padding-top').replace('px','') + $(this).css('padding-bottom').replace('px',''))) + 'px';
	});

	var types = ["h1", "a", "p", "strong"];
	var cssTypes = {"h1":{"font-family":"KeepCalm", "font-weight":"normal"}, "a":{"font-family":"Oran", "font-weight":"normal"}, "p":{"font-family":"Oran", "font-weight":"normal"}, "strong":{"font-family":"Oran", "font-weight":"bold"}};

	$("textarea").each(function() {
		$(this).css(cssTypes[$(this).data("element")]);
	});

	$(".thing-input").keyup(function(e) {
		var id = $(this).data("id");
		//var the_p = $("#"+id+"-p");
		//var the_form = $("#"+id+"-thing-form");
		var p_number = $(this).data("number");

		
		if(e.which == 40) {
			var nextNumber = p_number + 1;
			//console.log(p_number);
			if (p_number < types.length - 1) {
				//var new_element = "<" + types[nextNumber] + ' class="thing-example" id="' + id + '-p" data-number="' + nextNumber + '">' + $(this).val() + '</' + types[nextNumber] + '>';
				//the_p.remove();
				//the_form.append(new_element);

				$(this).data("number", nextNumber);
				$("#"+id+"-hidden").val(types[nextNumber]);
				$(this).css(cssTypes[types[nextNumber]]);
			}
			else if(nextNumber == types.length) {
				$(this).data("number", 0);
				$("#"+id+"-hidden").val(types[0]);
				$(this).css(cssTypes[types[0]]);
			}
		}
	});

	$(".thing-button").click(function() {
		alert("clicked");
		var id = $(this).data("id");
		var form = $("#"+id+"-form");
		$.ajax({
			type: "POST",
			url: form.attr("action"),
			data: form.serialize(),
			success: function(response) {
				alert("it worked");
			},
			error: function(response) {
				window.prompt(response);
			}
		});
	});

	$("#new-user").click(function() {
		$("#form_user").toggle();
	});

	$("#new-thing").click(function() {
		$("#form_thing").toggle();
	});

	$('.admin-swal-new').click(function() {
		swal({
			title: 'Add a new item!',
			text: '<select id="type-select"><option>Header</option><option>Paragraph</option></select>',
			showConfirmButton: true,
			html: true
		},
		function() {
			swal({
				showConfirmButton: true,
				html: true,
				confirmButtonText: 'Save!'
			},
			function() {

			});
		});
	});

	$('.admin-swal-delete').click(function() {
		var clicked_obj = $(this);

		swal({
			title: 'Are you sure?',
			text: 'By clicking confirm, this will delete your page and everything on it.',
			showCancelButton: true,
			showConfirmButton: true,
			closeOnConfirm: false,
			confirmButtonText: 'Delete Page',
			type: 'warning'
		},
		function() {
			var url = '/page/' + clicked_obj.data('id') + '/delete';

			$.ajax({
				url: url,
				method: 'DELETE',
				success: function() {
					console.log('success! Page deleted!');
				},
				error: function() {
					console.log('Oh shit Noah, the page would not delete.');
				}
			})
			.done(function(data) {
				$('#page-'+clicked_obj.data('id')).remove();
				$('#content-'+clicked_obj.data('id')).remove();

				swal({
					title: 'Deleted :(',
					showConfirmButton: true,
					type: 'success'
				});
			})
			.fail(function(data) {
				swal({
					title: 'Oh no...',
					text: 'We couldn\'t delete your page.',
					showConfirmButton: true,

				});
			});
		});
	});

	var slide = new Slideout({
	    'panel': document.getElementById('panel'),
	    'menu': document.getElementById('menu'),
	    'padding': 256,
	    'tolerance': 70
  	});

  	document.querySelector('.toggle-button').addEventListener('click', function() {
        slide.toggle();
      });
});