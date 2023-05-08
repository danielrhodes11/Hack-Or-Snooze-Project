"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */


function navSubmitClick(evt){
  console.debug("navSubmitClick", evt);
    $('#submit-form').show();
};
 

$(document).ready(function() {
  $('#nav-submit').on("click", function(evt) {
    navSubmitClick(evt);
  });
});



/** Show main list of all stories when click site name */


function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

// event listner for favorites tab in nav bar
$('#favorites-link').on("click", function(e){
  e.preventDefault();
  putFavoritesOnPage();
})


$(document).ready(function() {
  // Check if user is logged in
  if (!currentUser) {
   $(".main-nav-links").hide()
  } else {
    // User is logged in, show tabs
    $(".main-nav-links").show()
}})
