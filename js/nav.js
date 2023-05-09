"use strict";

// Handling navbar clicks and updating navbar
function navSubmitClick(evt){
  console.debug("navSubmitClick", evt);
  $('#submit-form').show();
}

$(document).ready(function() {
  // When the "submit" button is clicked, show the submit form
  $('#nav-submit').on("click", function(evt) {
    navSubmitClick(evt);
  });
});

// Show main list of all stories when clicking site name
function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents(); // hide all page components
  putStoriesOnPage(); // show all stories
}

$body.on("click", "#nav-all", navAllStories);

// Show login/signup when clicking "login"
function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents(); // hide all page components
  $loginForm.show(); // show login form
  $signupForm.show(); // show signup form
}

$navLogin.on("click", navLoginClick);

// When a user first logs in, update the navbar to reflect that
function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show(); // show main navigation links
  $navLogin.hide(); // hide login button
  $navLogOut.show(); // show logout button
  $navUserProfile.text(`${currentUser.username}`).show(); // show user profile name
}

// Event listener for favorites tab in navbar
$('#favorites-link').on("click", function(e){
  e.preventDefault();
  putFavoritesOnPage(); // show user's favorite stories
});

$(document).ready(function() {
  // Check if user is logged in
  if (!currentUser) {
   $(".main-nav-links").hide(); // hide main navigation links
  } else {
    // User is logged in, show tabs
    $(".main-nav-links").show();
  }
});
