$(function() {
	$(".thing-button").click(function() {
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

	$("#new_user").click(function() {
		$("#form_user").toggle();
	});

	$("#new_thing").click(function() {
		$("#form_thing").toggle();
	});
});