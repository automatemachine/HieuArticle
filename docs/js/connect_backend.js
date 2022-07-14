
function login() {
    // get email and password from the form
    const signin_button = document.getElementById('login-button');
    signin_button.disabled = true;
    signin_button.innerHTML = 'Đang đăng nhập...';
    const email = $('#email').val();
    const password = $('#password').val();
    const url = 'https://newsandstory.herokuapp.com/api/v1/login' + '?email=' + email + '&password=' + password;
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            if (data.status == 'success') {
                alert(data.message);
                localStorage.setItem('token', data.token);
                window.location.href = './home.html';
            }
            else {
                alert(data.message);
            }
            signin_button.disabled = false;
            signin_button.innerHTML = 'Đăng nhập';
    },
        error: function (xhr) {
            alert("Đã có lỗi khi kết nối đến máy chủ, mã lỗi: " + xhr.statusText + " " + xhr.status);
            signin_button.disabled = false;
            signin_button.innerHTML = 'Đăng nhập';
        },
    });
}

function signup() {
    const signup_button = document.getElementById('signup-button');
    signup_button.disabled = true;
    signup_button.innerHTML = 'Đang hoàn tất...';
    const email = $('#email').val();
    const password = $('#password').val();
    const password_confirmation = $('#password2').val();
    const authorname = $('#authorname').val();
    const name = $('#name').val();
    if (password != password_confirmation) {
        alert('Password does not match');
        signup_button.disabled = false;
        signup_button.innerHTML = 'Đăng ký';
        return;
    }
    const url = 'https://newsandstory.herokuapp.com/api/v1/signup' + '?email=' + email + '&password=' + password + '&authorname=' + authorname + '&name=' + name;
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            if (data.status == 'success') {
                alert(data.message);
                localStorage.setItem('token', data.token);
                window.location.href = './signin.html';
            }
            else {
                alert(data.message);
            }
            signup_button.disabled = false;
            signup_button.innerHTML = 'Đăng ký';
        },
        error: function (xhr) {
            alert("Đã có lỗi khi kết nối đến máy chủ, mã lỗi: " + xhr.statusText + " " + xhr.status);
            signup_button.disabled = false;
            signup_button.innerHTML = 'Đăng ký';
        },
        
    });
    
    
}

function authenticate() {
    $('#overlay').show();
    const url = 'https://newsandstory.herokuapp.com/api/v1/authenticate' + '?token=' + localStorage.getItem('token');
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            console.log(data.status)
            if (data.status == 'fail') {
                localStorage.removeItem('token');
                let current_url = window.location.href;
                if (current_url.includes('home')) {
                    window.location.href = './signin.html';
                }
                $('#overlay').hide(1000, 'swing');
                return false;
            }
            else {
                let current_url = window.location.href;
                if (current_url.includes('signin') || current_url.includes('signup')) {
                    window.location.href = './home.html';
                }
                $('#overlay').hide(1000, 'swing');
                return true;
            }
            
    },
        error: function (xhr) {
            alert("Đã có lỗi khi kết nối đến máy chủ, mã lỗi: " + xhr.statusText + " " + xhr.status);
            window.location.href = '/';
            return false;
        }
    });
}

function authenticate_2() {
    $('#overlay').show();
    const url = 'https://newsandstory.herokuapp.com/api/v1/authenticate' + '?token=' + localStorage.getItem('token');
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            console.log(data.status)
            if (data.status == 'fail') {
                localStorage.removeItem('token');
                alert('Bạn chưa đăng nhập hoặc mã đã hết hạn !');
                window.location.href = '/creating_your_own/signin.html';
                $('#overlay').hide(1000, 'swing');
                return false;
            }
            else {
                $('#overlay').hide(1000, 'swing');
                return true;
            }
            
    },
        error: function (xhr) {
            alert("Đã có lỗi khi kết nối đến máy chủ, mã lỗi: " + xhr.statusText + " " + xhr.status);
            window.location.href = '/';
            return false;
        }
    });
}

function personaldata() {
    const url = 'https://newsandstory.herokuapp.com/api/v1/myaccount' + '?token=' + localStorage.getItem('token');
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            if (data.status == 'success') {
                document.getElementById('email').innerHTML = data.email;
                document.getElementById('storycount').innerHTML = data.storycount;
                document.getElementById('viewcount').innerHTML = data.viewcount;
                document.getElementById('commentcount').innerHTML = data.commentscount;
                document.getElementById('likes').innerHTML = data.likes;
                document.getElementById('dislikes').innerHTML = data.dislikes;
                document.getElementById('authorname').innerHTML = data.authorname;
                document.getElementById('name').innerHTML = data.name;
                const banned = data.banned;
                if (banned == true) {
                    document.getElementById('status').innerHTML = 'Đã bị cấm';
                }
                else {
                    document.getElementById('status').innerHTML = 'Đang hoạt động';
                }

            }
            else {
                localStorage.removeItem('token');
                alert(data.message);
                window.location.href = './signin.html';
            }
    }
    });
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = './signin.html';
}

function get_story_list() {
    const url = 'https://newsandstory.herokuapp.com/api/v1/mystories' + '?token=' + localStorage.getItem('token');
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            if (data.status == 'success') {
                let story_list = document.getElementById('mystories');
                if (Object.keys(data.stories).length > 0) {
                    const div_box = document.getElementById('mystories_box');
                    const div_0 = document.createElement('div');
                    div_0.className = 'row gx-0';
                    for (let story of data.stories) {
                        let div_1 = document.createElement('div');
                        div_1.className = 'col-lg-6';
                        let a_1 = document.createElement('a');
                        a_1.className = 'portfolio-item';
                        a_1.href = './story.html?url=' + story.storyurl + '&author=' + story.storyauthor + '&chapter=' + story.storychapter;
                        div_1.appendChild(a_1);
                        let div_2 = document.createElement('div');
                        div_2.className = 'caption';
                        a_1.appendChild(div_2);
                        let div_3 = document.createElement('div');
                        div_3.className = 'caption-content';
                        div_2.appendChild(div_3);
                        div_4 = document.createElement('div');
                        div_4.className = 'h2';
                        div_4.innerHTML = story.storyname;
                        div_3.appendChild(div_4);
                        p_1 = document.createElement('p');
                        p_1.className = 'mb-0';
                        p_1.innerHTML = story.storydescription;
                        div_3.appendChild(p_1);
                        img_1 = document.createElement('img');
                        img_1.className = 'img-fluid';
                        img_1.src = story.storyimagelink;
                        img_1.style = 'object-fit:cover;width:650px;height:350px;'
                        a_1.appendChild(img_1);
                        div_0.appendChild(div_1);
                    }
                    div_box.appendChild(div_0);
                }
                else {
                    let nostories = document.createElement('h3');
                    nostories.className = 'text-center mb-0 text-danger';
                    nostories.innerHTML = 'Bạn chưa có truyện nào';
                    story_list.appendChild(nostories);
            }
            }
            else {
                localStorage.removeItem('token');
                alert(data.message);
                window.location.href = './signin.html';
            }
    }
    });
}

function create_story() {
    try {
    const create_button = document.getElementById('create_story_button');
    create_button.disabled = true;
    create_button.innerHTML = 'Đang tạo... (1-3 phút)';
    const title =  $('#title').val();
    const description = $('#des').val();
    const image = document.getElementById('getFile').files[0];
    const content = $('#content').val();
    const url = 'https://newsandstory.herokuapp.com/api/v1/create_story';
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('content', content);
    formData.append('token', localStorage.getItem('token'));
    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (datax) {
            if (datax.status == 'success') {
                alert('Tạo truyện thành công');
                window.location.href = './home.html';
            }
            else {
                alert(datax.message);
                create_button.disabled = false;
                create_button.innerHTML = 'Tạo :Đ';
            }
        }
    });
    }
    catch (err) {
        alert(err);
    }
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};


function get_news_and_official_stories() {
    const url = 'https://newsandstory.herokuapp.com/api/v1/home_info';
    const story_list = document.getElementById('portfolio');
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            if (data.status == 'success') {
                if (Object.keys(data.news).length > 0) {
                    let div_box = document.getElementById('news_col_6');
                    let div_0 = document.createElement('div');
                    div_0.className = 'row gx-2';
                    for (let news of data.news) {
                        let div_1 = document.createElement('div');
                        div_1.className = 'col-lg-6';
                        let a_1 = document.createElement('a');
                        a_1.className = 'portfolio-item';
                        a_1.href = news.url;
                        div_1.appendChild(a_1);
                        let div_2 = document.createElement('div');
                        div_2.className = 'caption';
                        a_1.appendChild(div_2);
                        let div_3 = document.createElement('div');
                        div_3.className = 'caption-content';
                        div_1.appendChild(div_3);
                        div_4 = document.createElement('div');
                        div_4.className = 'h4 text-body';
                        div_4.innerHTML = news.title;
                        div_3.appendChild(div_4);
                        p_1 = document.createElement('p');
                        p_1.className = 'mb-3 lead';
                        p_1.innerHTML = news.description;
                        div_3.appendChild(p_1);
                        img_1 = document.createElement('img');
                        img_1.className = 'img-fluid';
                        img_1.src = news.image_url;
                        img_1.style = 'object-fit:cover;width:650px;height:350px;'
                        a_1.appendChild(img_1);
                        div_0.appendChild(div_1);
                    }
                    div_box.appendChild(div_0);
                }
                if (Object.keys(data.stories).length > 0) {
                    let div_box = document.getElementById('stories_col_6');
                    let div_0 = document.createElement('div');
                    div_0.className = 'row gx-2';
                    for (let story of data.stories) {
                        let div_1 = document.createElement('div');
                        div_1.className = 'col-lg-6';
                        let a_1 = document.createElement('a');
                        a_1.className = 'portfolio-item';
                        a_1.href = story.url;
                        div_1.appendChild(a_1);
                        let div_2 = document.createElement('div');
                        div_2.className = 'caption';
                        a_1.appendChild(div_2);
                        let div_3 = document.createElement('div');
                        div_3.className = 'caption-content';
                        div_1.appendChild(div_3);
                        div_4 = document.createElement('div');
                        div_4.className = 'h4 text-body';
                        div_4.innerHTML = story.title;
                        div_3.appendChild(div_4);
                        p_1 = document.createElement('p');
                        p_1.className = 'mb-3 lead';
                        p_1.innerHTML = story.description;
                        div_3.appendChild(p_1);
                        img_1 = document.createElement('img');
                        img_1.className = 'img-fluid';
                        img_1.src = story.image_url;
                        img_1.style = 'object-fit:cover;width:650px;height:350px;'
                        a_1.appendChild(img_1);
                        div_0.appendChild(div_1);
                    }
                    div_box.appendChild(div_0);
                }
                else {
                    let noinfo = document.createElement('h3');
                    noinfo.className = 'text-center mb-0 text-danger';
                    noinfo.innerHTML = 'Không tìm thấy thông tin';
                    story_list.appendChild(noinfo);
            }
            }
            else {
                
                let noinfo = document.createElement('h3');
                noinfo.className = 'text-center mb-0 text-danger';
                noinfo.innerHTML = 'Không tìm thấy thông tin';
                story_list.appendChild(noinfo);
                alert(data.message);
            }
        
    },
        error: function (data) {
            let noinfo = document.createElement('h3');
            noinfo.className = 'text-center mb-0 text-danger';
            noinfo.innerHTML = 'Máy chủ không phản hồi, bạn hãy liên hệ <a href="https://facebook.com/py.hacker.hieu">admin</a> nếu thấy có sự cố không mong muốn';
            story_list.appendChild(noinfo);
        }

    });
}

function get_news() {
    const url = 'https://newsandstory.herokuapp.com/api/v1/news';
    const news_list = document.getElementById('All_News');
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            if (data.status == 'success') {
                if (Object.keys(data.news).length > 0) {
                    const div_box = document.getElementById('news_row');
                    for (let news of data.news) {
                        let div_1 = document.createElement('div');
                        div_1.className = 'col-lg-3 col-md-6 mb-5';
                        let a_1 = document.createElement('a');
                        a_1.className = 'portfolio-item';
                        a_1.href = news.url;
                        div_1.appendChild(a_1);
                        let div_2 = document.createElement('div');
                        div_2.className = 'caption';
                        a_1.appendChild(div_2);
                        //div_1.appendChild(div_2);
                        let div_3 = document.createElement('div');
                        div_3.className = 'caption-content';
                        div_1.appendChild(div_3);
                        div_4 = document.createElement('div');
                        div_4.className = 'h4';
                        div_4.innerHTML = news.title;
                        div_3.appendChild(div_4);
                        p_1 = document.createElement('p');
                        p_1.className = 'mb-3 lead';
                        p_1.innerHTML = news.description;
                        div_3.appendChild(p_1);
                        img_1 = document.createElement('img');
                        img_1.className = 'img-fluid';
                        img_1.src = news.image_url;
                        img_1.style = 'object-fit:cover;width:650px;height:350px;'
                        a_1.appendChild(img_1);
                        div_box.appendChild(div_1);
                    }
                }
                else {
                    let nostories = document.createElement('h3');
                    nostories.className = 'text-center mb-0 text-danger';
                    nostories.innerHTML = 'Không tìm thấy thông tin';
                    news_list.appendChild(nostories);
                }
            }
            else {
                let nostories = document.createElement('h3');
                nostories.className = 'text-center mb-0 text-danger';
                nostories.innerHTML = 'Không tìm thấy thông tin';
                news_list.appendChild(nostories);
                alert(data.message);
            }
        },
        error: function (data) {
            let nostories = document.createElement('h3');
            nostories.className = 'text-center mb-0 text-danger';
            nostories.innerHTML = 'Máy chủ không phản hồi, bạn hãy liên hệ <a href="https://facebook.com/py.hacker.hieu">admin</a> nếu thấy có sự cố không mong muốn';
            news_list.appendChild(nostories);
        }
    });
}


function get_beta_stories() {
    const url = 'https://newsandstory.herokuapp.com/api/v1/beta_stories';
    const story_list = document.getElementById('Beta_div');
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            console.log(data)
            if (data.status == 'success') {
                if (Object.keys(data.stories).length > 0) {
                    const div_box = document.getElementById('div_0');
                    for (let story of data.stories) {
                        let div_1 = document.createElement('div');
                        div_1.className = 'col-lg-6';
                        let a_1 = document.createElement('a');
                        a_1.className = 'portfolio-item';
                        a_1.href = '/creating_your_own/story.html?url=' + story.storyurl + '&author=' + story.storyauthor + '&chapter=' + story.storychapter;
                        div_1.appendChild(a_1);
                        let div_2 = document.createElement('div');
                        div_2.className = 'caption';
                        a_1.appendChild(div_2);
                        let div_3 = document.createElement('div');
                        div_3.className = 'caption-content';
                        div_2.appendChild(div_3);
                        div_4 = document.createElement('div');
                        div_4.className = 'h4';
                        div_4.textContent = story.storyname + ' - ' + story.totalchapter + ' Chapter';
                        div_3.appendChild(div_4);
                        p_1 = document.createElement('p');
                        p_1.className = 'mb-3 lead';
                        p_1.textContent = story.storydescription;
                        div_3.appendChild(p_1);
                        img_1 = document.createElement('img');
                        img_1.className = 'img-fluid';
                        img_1.src = story.storyimagelink;
                        img_1.style = 'object-fit:cover;width:650px;height:350px;'
                        a_1.appendChild(img_1);
                        div_box.appendChild(div_1);
                    }
                }
                else {
                    let nostories = document.createElement('h3');
                    nostories.className = 'text-center mb-0 text-danger';
                    nostories.innerHTML = 'Không tìm thấy thông tin';
                    story_list.appendChild(nostories);
                }
            }
            else {
                let nostories = document.createElement('h3');
                nostories.className = 'text-center mb-0 text-danger';
                nostories.innerHTML = 'Không tìm thấy thông tin';
                story_list.appendChild(nostories);
                alert(data.message);
            }
        },
        error: function (data) {
            let nostories = document.createElement('h3');
            nostories.className = 'text-center mb-0 text-danger';
            nostories.innerHTML = 'Máy chủ không phản hồi, bạn hãy liên hệ <a href="https://facebook.com/py.hacker.hieu">admin</a> nếu thấy có sự cố không mong muốn';
            story_list.appendChild(nostories);
        }
    });
}

function get_stories() {
    const url = 'https://newsandstory.herokuapp.com/api/v1/stories';
    const story_list = document.getElementById('All_Stories');
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            if (data.status == 'success') {
                if (Object.keys(data.stories).length > 0) {
                    const div_box = document.getElementById('stories_row');
                    for (let story of data.stories) {
                        let div_1 = document.createElement('div');
                        div_1.className = 'col-lg-3 col-md-6 mb-5';
                        let a_1 = document.createElement('a');
                        a_1.className = 'portfolio-item';
                        a_1.href = story.url;
                        div_1.appendChild(a_1);
                        let div_2 = document.createElement('div');
                        div_2.className = 'caption';
                        a_1.appendChild(div_2);
                        let div_3 = document.createElement('div');
                        div_3.className = 'caption-content';
                        div_1.appendChild(div_3);
                        div_4 = document.createElement('div');
                        div_4.className = 'h4';
                        div_4.innerHTML = story.title;
                        div_3.appendChild(div_4);
                        p_1 = document.createElement('p');
                        p_1.className = 'mb-3 lead';
                        p_1.innerHTML = story.description;
                        div_3.appendChild(p_1);
                        img_1 = document.createElement('img');
                        img_1.className = 'img-fluid';
                        img_1.src = story.image_url;
                        img_1.style = 'object-fit:cover;width:650px;height:350px;'
                        a_1.appendChild(img_1);
                        div_box.appendChild(div_1);
                    }
                }
                else {
                    let nostories = document.createElement('h3');
                    nostories.className = 'text-center mb-0 text-danger';
                    nostories.innerHTML = 'Không tìm thấy thông tin';
                    story_list.appendChild(nostories);
                }
            }
            else {
                let nostories = document.createElement('h3');
                nostories.className = 'text-center mb-0 text-danger';
                nostories.innerHTML = 'Không tìm thấy thông tin';
                story_list.appendChild(nostories);
                alert(data.message);
            }
        },
        error: function (data) {
            let nostories = document.createElement('h3');
            nostories.className = 'text-center mb-0 text-danger';
            nostories.innerHTML = 'Máy chủ không phản hồi, bạn hãy liên hệ <a href="https://facebook.com/py.hacker.hieu">admin</a> nếu thấy có sự cố không mong muốn';
            story_list.appendChild(nostories);
        }
    });
}

function load_current_chapter(id='') {
    try{
        $('#overlay').show();
        const storyurl = getUrlParameter('url');
        const author = getUrlParameter('author');
        const chapter = getUrlParameter('chapter');
        const url = 'https://newsandstory.herokuapp.com/api/v1/story' + '?url=' + storyurl + '&token=' + localStorage.getItem('token') + '&author=' + author + '&chapter=' + chapter;
        $.ajax({
            url: url,
            type: 'GET',
            success: function (data) {
                if (data.status == 'success') {
                    if (data.is_this_author == true) {
                        $.ajax({
                            url: 'https://newsandstory.herokuapp.com/api/v1/mystories' + '?token=' + localStorage.getItem('token'),
                            type: 'GET',
                            success: function (data_2) {
                                if (data_2.status == 'success') {
                                    if (id == '') {
                                    const all_chapter = document.getElementById('all_chapter');
                                    if (Object.keys(data_2.stories).length > 0) {
                                        for (let story of data_2.stories) {
                                            if (story.storyurl == storyurl) {
                                                let chapter_option = document.createElement('option');
                                                chapter_option.value = story.storychapter;
                                                chapter_option.innerHTML = story.storychapter;
                                                all_chapter.appendChild(chapter_option);
                                            }
                                        }
                                    }
                                    }
                                    $('#overlay').hide(1000, 'swing');
                                    document.getElementById('title').value = data.story.storyname;
                                    document.getElementById('des').value = data.story.storydescription;
                                    document.getElementById('content').innerHTML = data.story.storycontent;
                                    document.getElementById('chapternum').value = data.story.storychapter;
                                }
                                else {
                                    alert(data.message);
                                }
                            },
                            error: function (data) {
                                alert(data.message);
                            }
                        });
                    }
                    else {
                        alert('Bạn không phải tác giả của truyện này');
                        window.location.href = '/';
                    }
                }
                else {
                    alert(data.message);
                    window.location.href = '/';
                }
        }
        });
        }
        catch (err) {
            alert(err);
        }
}

function redirect_create_chapter() {
    const storyurl = getUrlParameter('url');
    const author = getUrlParameter('author');
    const chapter = getUrlParameter('chapter');
    window.location.href = './new_chapter.html?url=' + storyurl + '&author=' + author + '&chapter=' + chapter;
}

function delete_chapter() {
    const button = document.getElementById('remove_chapter_button');
    button.disabled = true;
    button.innerHTML = 'Đang xóa chương...';
    const storyurl = getUrlParameter('url');
    const author = getUrlParameter('author');
    const chapter = getUrlParameter('chapter');
    const url = 'https://newsandstory.herokuapp.com/api/v1/delchap' + '?url=' + storyurl + '&token=' + localStorage.getItem('token') + '&author=' + author + '&chapter=' + chapter;
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            button.disabled = false;
            button.innerHTML = 'Xóa chương này';
            if (data.status == 'success') {
                alert('Xóa chương thành công');
                window.location.href = './home.html';
            }
            else {
                alert(data.message);
            }
        },
        error: function (data) {
            button.disabled = false;
            button.innerHTML = 'Xóa chương này';
            alert(data.message);
        }
    });
}

function delete_story() {
    const button = document.getElementById('remove_story_button');
    button.disabled = true;
    button.innerHTML = 'Đang xóa truyện...';
    const storyurl = getUrlParameter('url');
    const author = getUrlParameter('author');
    const url = 'https://newsandstory.herokuapp.com/api/v1/delstory' + '?url=' + storyurl + '&token=' + localStorage.getItem('token') + '&author=' + author;
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            button.disabled = false;
            button.innerHTML = 'Xóa truyện này';
            if (data.status == 'success') {
                alert('Xóa truyện thành công');
                window.location.href = './home.html';
            }
            else {
                alert(data.message);
            }
        },
        error: function (data) {
            button.disabled = false;
            button.innerHTML = 'Xóa truyện này';
            alert(data.message);
        }
    });
}

function change_chapter() {
    const storyurl = getUrlParameter('url');
    const author = getUrlParameter('author');
    const selected_chapter = document.getElementById('all_chapter').value;
    window.location.href = './edit.html?url=' + storyurl + '&author=' + author + '&chapter=' + selected_chapter;
}

function edit_story() {
    const button = document.getElementById('edit_story_button');
    button.disabled = true;
    button.innerHTML = 'Đang chỉnh sửa...';
    const storyurl = getUrlParameter('url');
    const author = getUrlParameter('author');
    const chapter = getUrlParameter('chapter');
    const url = 'https://newsandstory.herokuapp.com/api/v1/editstory' + '?url=' + storyurl + '&token=' + localStorage.getItem('token') + '&author=' + author + '&chapter=' + chapter;
    const title = document.getElementById('title').value;
    const des = document.getElementById('des').value;
    const content = document.getElementById('content').value;
    const formdata = new FormData();
    formdata.append('title', title);
    formdata.append('description', des);
    formdata.append('content', content);
    $.ajax({
        url: url,
        type: 'POST',
        data: formdata,
        contentType: false,
        processData: false,
        success: function (data) {
            button.disabled = false;
            button.innerHTML = 'Chỉnh sửa';
            if (data.status == 'success') {
                alert('Sửa thành công');
                window.location.href = './home.html';
            }
            else {
                alert(data.message);
            }
        },
        error: function (data) {
            button.disabled = false;
            button.innerHTML = 'Chỉnh sửa';
            alert(data.message );
        }
    });
}

function create_chapter() {
    const button = document.getElementById('create_chapter_button');
    button.disabled = true;
    button.innerHTML = 'Đang tạo chương...';
    const storyurl = getUrlParameter('url');
    const author = getUrlParameter('author');
    const chapter = getUrlParameter('chapter');
    const url = 'https://newsandstory.herokuapp.com/api/v1/newchaper' + '?url=' + storyurl + '&token=' + localStorage.getItem('token') + '&author=' + author + '&chapter=' + chapter;
    const formdata = new FormData();
    formdata.append('description', document.getElementById('des').value);
    formdata.append('content', document.getElementById('content').value);
    formdata.append('chapternum', document.getElementById('chapternum').value);
    $.ajax({
        url: url,
        type: 'POST',
        data: formdata,
        contentType: false,
        processData: false,
        success: function (data) {
            button.disabled = false;
            button.innerHTML = 'Tạo chương';
            if (data.status == 'success') {
                alert('Tạo chương thành công');
                window.location.href = './home.html';
            }
            else {
                alert(data.message);
            }
        },
        error: function (data) {
            button.disabled = false;
            button.innerHTML = 'Tạo chương';
            alert(data.message);
        }
    });
}