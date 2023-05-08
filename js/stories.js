"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  const starHTML = getStarHTML(story, currentUser);
  let deleteButton = '';

  if (currentUser) {
    deleteButton = '<span class="trash-can"><i class="fas fa-trash-alt"></i></span>';
  }

  return $(`
      <li id="${story.storyId}" >
      ${ starHTML }
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        ${deleteButton}
      </li>
    `);
}









function getStarHTML(story) {
  if (currentUser) {
    const isFavorite = currentUser.favorites.some(f => f.storyId === story.storyId);
    const starType = isFavorite ? "fas" : "far";
    return `<span class="star">
              <i class="${starType} fa-star"></i>
            </span>`;
  } else {
    return "";
  }
}




async function toggleStoryFavorite(evt) {
  console.debug("toggleStoryFavorite");

  const $tgt = $(evt.target);
  const $closestLi = $tgt.closest("li");
  const storyId = $closestLi.attr("id");
  const story = storyList.stories.find(s => s.storyId === storyId);

  // Toggle the favorite status of the story
  if (currentUser.isFavorite(story)) {
    await currentUser.removeFavorite(story);
    $tgt.closest("i").toggleClass("fas far");
  } else {
    await currentUser.addFavorite(story);
    $tgt.closest("i").toggleClass("fas far");
  }
}

$(document).on('click', '.star', toggleStoryFavorite)


/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();

}



//  loops through selected favorites and puts them on the favorites page.
function putFavoritesOnPage(){
  console.debug(putFavoritesOnPage);
  const favorites = [];

  if(currentUser.favorites.length === 0){
    $allStoriesList.empty().append($('<p>').text('No favorites added!'));
    return;
  }

  for(let story of currentUser.favorites){
    const $favorite = generateStoryMarkup(story);
    favorites.push($favorite);
  }
  $allStoriesList.empty().append(favorites);
  $allStoriesList.show();
}




async function submitStory(){
 console.debug("submitStory");
 const author = $('#create-author').val();
 const title = $('#create-title').val();
 const url = $('#add-url').val();
 await storyList.addStory(currentUser, { author, title, url });
 putStoriesOnPage();

 $('#create-author').val('');
 $('#create-title').val('');
 $('#add-url').val('');

 $('#submit-form').slideUp(500);

}




$(document).ready(function() {
  $('#story-submit').on("click", submitStory);
});


async function removeStory(story){
  console.debug(removeStory);
  const token = currentUser.loginToken;
  await storyList.removeStory(token, story.storyId);
  $allStoriesList.find(`#${story.storyId}`).remove();
}




async function toggleStoryDelete(evt){
  console.debug(toggleStoryDelete);

  const $tgt = $(evt.target);
  const $closestLi = $tgt.closest("li");
  const storyId = $closestLi.attr("id");
  const story = storyList.stories.find(s => s.storyId === storyId);

  if (story.username !== currentUser.username) {
    alert("You can only delete stories that you've posted!");
    return;
  }

  await removeStory(story); 
}

$(document).on("click", ".trash-can", toggleStoryDelete);






function myStoriesOnPage(){
  console.debug(myStoriesOnPage);
  $allStoriesList.empty();

  if(currentUser.ownStories.length === 0){
    $allStoriesList.append($('<p>').text('No stories added by user yet!'));
    return;
  }

  for (let story of currentUser.ownStories) {
    const $story = generateStoryMarkup(story);
    $story.addClass("own-story")
    $allStoriesList.append($story);
  }
  $allStoriesList.show();
}


$('#ownStories-link').on('click', myStoriesOnPage)







