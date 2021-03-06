// offset variable
var offset = 0;

$(document).ready(showPosts);

function scrollListen() {
  $(window).bind("scroll", function() {
    if (
      $(window).scrollTop() + $(window).height() >
      $(document).height() - 500
    ) {
      addPosts(3);
    }
  });
}

function showPosts() {
  addPosts(5);
}

function addPosts(n) {
  $(window).off("scroll");
  mHeritageGoService
    .getPhotos({ limit: n, offset: offset })
    .then(photos => {
      $.each(photos, function(index, photo) {
        mHeritageGoService
          .getPhoto(photo)
          .then(photo_detail => {
            let feed = $(".main_mid");
            let post = $(".post:first").clone();
            post.removeClass("post--display-none");

            post
              .find(".post__user-avatar")
              .attr("src", "http:" + photo_detail.account.picture_url);

            post.find(".post__title").html(photo_detail.title[0].content);

            post.find("#area_name").html(photo_detail.area_name);

            post
              .find(".post__image")
              .attr("src", "http:" + photo_detail.image_url + "?size=medium");

            post.find(".post__likes-counter").html(photo_detail.like_count);

            post.find(".post__comments-counter").html(photo_detail.comment_count);
            feed.append(post);
            offset += n;
          })
          .catch(error => {
            console.log(error);
          });
      });
    })
    .catch($error => {
      console.log($error);
    })
    .then(() => {
      scrollListen();
    });
}
