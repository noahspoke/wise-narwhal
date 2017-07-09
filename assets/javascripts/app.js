var $ = require('jquery');

$(function() {
	$(".page-heading").click(function() {
		var id = $(this).data("id");
		var childI = $(this).find("i");

		if (childI.hasClass("fa-plus")) {
			childI.removeClass("fa-plus");
			childI.addClass("fa-minus");
		}
		else {
			childI.removeClass("fa-minus");
			childI.addClass("fa-plus");
		}

		$("#"+id+"-content").slideToggle(100);
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
});