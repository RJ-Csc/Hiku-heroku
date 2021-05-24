$(document).ready(function() {

  $('#submitPost').click(function() {
    var username = {{{json username}}};
    var title = $('#searchfield').val();
    var content = $('#forumSubmission').val();

    if (title === '')
      title = 'No Title';
    if (content === '')
      content = 'No Content';

    var discussion = {
      username: username,
      title: title + '\n\n',
      content: content
    };
    $.get('/postDiscussion', discussion, function(data, status) {
      if (status == "success") {
        console.log('Success in adding');
      }
      else {
        console.log('no success in adding');
      }
    });

    var postContainer = $('<div class="forumpost"></div>');

    var postType = $('<div class="forumtype forumtype_discussion"></div>');
    var postTypeIcon = $('<div class="forumtype_icons disc_icon"></div>');

    var postContent = $('<div class="forumcontent"></div>');

    var postHeader = $('<div class="forumpostheader"></div>');
    var postUserIcon = $('<img class="usericon" src="../images/{{prof_pic}}" alt="{{username}} Icon">');
    var postHeaderContent = $('<div class="forumheadercontent"></div>');
    postHeaderContent.text(username);

    var postLink = $('<a href="forumpost3.html"></a>');
    var postBody = $('<p class="forumbodycontent"></p>');
    printTitle = title.bold() + '\n\n';
    postBody.html(printTitle + content);

    var postFooter = $('<div class="forumpostfooter"></div>');
    var postDislike = $('<input class="forumreax" type="image" src="../images/dislike.png">').click(function(){posts[i].rating -= 1; postRatingCnt.text(posts[i].rating);});
    var postRatingCnt = $('<p class="forumreaxcnt"></p>');
    postRatingCnt.text('0');
    var postLike = $('<input id="likebtn1" class="forumreax" type="image" src="../images/like.png">').click(function(){posts[i].rating += 1; postRatingCnt.text(posts[i].rating);});
    var postCommentCnt = $('<p class="forumcommentcnt"></p>');

    postContainer.append(postType);
    postType.append(postTypeIcon);

    postContainer.append(postContent);
    postContent.append(postHeader);
    postHeader.append(postUserIcon);
    postHeader.append(postHeaderContent);
    postContent.append(postLink);
    postLink.append(postBody);

    postContent.append(postFooter);
    postFooter.append(postDislike);
    postFooter.append(postRatingCnt);
    postFooter.append(postLike);
    postFooter.append(postCommentCnt);

    $('#forumlist').append(postContainer);

    $('#searchfield').val('');
    $('forumSubmission').val('');
  });
});
