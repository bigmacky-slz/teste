const edit1 = document.querySelector('.edit1');
const edit2 = document.querySelector('.edit2');
const edit3 = document.querySelector('.edit3');
const rc1 = document.getElementById('r_c1');
const rc2 = document.getElementById('r_c2');
const rc3 = document.getElementById('r_c3');

edit1.addEventListener('click', function() {
  rc1.style.display = 'flex';
  rc2.style.display = 'none';
  rc3.style.display = 'none';
});

edit2.addEventListener('click', function() {
  rc1.style.display = 'none';
  rc2.style.display = 'flex';
  rc3.style.display = 'none';
});

edit3.addEventListener('click', function() {
  rc1.style.display = 'none';
  rc2.style.display = 'none';
  rc3.style.display = 'flex';
});

function changeColor(buttonId) {
  var buttons = document.getElementsByClassName("editbtns")[0].getElementsByTagName("button");

  // Remove a classe 'selected' de todos os botões
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("selected");
  }

  // Adiciona a classe 'selected' apenas ao botão clicado
  var selectedButton = document.querySelector(".editbtns .edit" + buttonId);
  selectedButton.classList.add("selected");
}


var originalSrc = document.querySelector('.main__img').src;

// container 1
var cropper1;
const upload1 = document.getElementById('upload1');
const aboveUpload1 = document.querySelector('.above_upload1');
const openPopup1 = document.querySelector('.open__popup1');
const removeFile1 = document.querySelector('.remove_file1');
const PopupEditor1 = document.querySelector('.popup__background1');
const closePopup1 = document.getElementById('closePopupEditor1');
const cropfileInput1 = document.getElementById('croppedImageInput1');

upload1.addEventListener('change', function(e) {
  if (e.target.files.length > 0) {
    PopupEditor1.style.display = 'block';
    aboveUpload1.style.display = 'flex';
    closePopup1.style.display = 'none';
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
      var img = new Image();
      img.onload = function() {
        var editor1 = document.getElementById('editor1');
        editor1.innerHTML = '';
        editor1.appendChild(img);
        cropper1 = new Cropper(img, {
          aspectRatio: 1 / 1,
          crop: function(event) {
            var canvas = cropper1.getCroppedCanvas({
              aspectRatio: 1 / 1
            });
            document.getElementById('preview1').innerHTML = '';
            document.getElementById('preview1').appendChild(canvas);
          }
        });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    PopupEditor1.style.display = 'none';
    document.getElementById('previewResult1').src = '';
    document.getElementById('preview_user').src = originalSrc;
    closePopup1.style.display = 'none';
    aboveUpload1.style.display = 'none';
    cropfileInput1.value = '';
  }
});


document.getElementById('cropBtn1').addEventListener('click', function() {
  var canvas = cropper1.getCroppedCanvas({
    aspectRatio: 1 / 1
  });
  PopupEditor1.style.display = 'none';
  closePopup1.style.display = 'flex';
  var croppedImage1 = canvas.toDataURL();
  document.getElementById('previewResult1').src = croppedImage1;
  document.getElementById('preview_user').src = croppedImage1;

  fetch(croppedImage1)
    .then(res => res.blob())
    .then(blob => {
      var cropfileInput1 = document.getElementById('croppedImageInput1');
      var fileList1 = createFileList(blob, 'croppedImage1.png');
      cropfileInput1.files = fileList1;
    });
  function createFileList(file1, name1) {
    var fileList1 = new DataTransfer();
    var newFile1 = new File([file1], name1);
    fileList1.items.add(newFile1);
    return fileList1.files;
  }    
});

closePopup1.addEventListener('click', function() {
  PopupEditor1.style.display = 'none';
});

document.getElementById('remove_file_editor1').addEventListener('click', function() {
  upload1.value = '';
  PopupEditor1.style.display = 'none';
  document.getElementById('previewResult1').src = '';
  document.getElementById('preview_user').src = originalSrc;
  closePopup1.style.display = 'none';
  aboveUpload1.style.display = 'none';
  cropfileInput1.value = '';
});

openPopup1.addEventListener('click', function() {
  PopupEditor1.style.display = 'block';
  var fileInput1 = document.getElementById('upload1');
  var file = fileInput1.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    var img = new Image();
    img.onload = function() {
      var editor1 = document.getElementById('editor1');
      editor1.innerHTML = '';
      editor1.appendChild(img);
      cropper1 = new Cropper(img, {
        aspectRatio: 1 / 1,
        crop: function(event) {
          var canvas = cropper1.getCroppedCanvas({
            aspectRatio: 1 / 1
          });
          document.getElementById('preview1').innerHTML = '';
          document.getElementById('preview1').appendChild(canvas);
        }
      });
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

removeFile1.addEventListener('click', function() {
  upload1.value = '';
  PopupEditor1.style.display = 'none';
  document.getElementById('previewResult1').src = '';
  document.getElementById('preview_user').src = originalSrc;
  closePopup1.style.display = 'none';
  aboveUpload1.style.display = 'none';
  cropfileInput1.value = '';
});

function updatePreview1() {
  var inputText1 = document.getElementById("input-text1").value;
  var previewText1 = document.querySelector(".user__name1");
  previewText1.textContent = inputText1;
  document.querySelector(".user__name").textContent = inputText1;
}

function updateCharCount() {
  var inputText1 = document.getElementById("input-text1").value;
  var charCount1 = inputText1.length;
  var charLimit1 = 20;
  var charCountElement1 = document.getElementById("char-count1");
  charCountElement1.textContent = charCount1 + "/" + charLimit1;
  var replicatedTextElement1 = document.getElementById("replicated-text1");
  replicatedTextElement1.value = inputText1;
}

var $input1 = $('#input-text1');
$input1.on('input', function(e) {
  var max = 20;
  setTimeout(function() {
    if ($input1.val().length > max) {
      $input1.val($input1.val().substr(0, max));
    }
    updatePreview1(); // Atualiza a prévia do texto
    updateCharCount(); // Atualiza a contagem de caracteres
  }, 0);
});

// container 2 

var cropper2;
const upload2 = document.getElementById('upload2');
const aboveUpload2 = document.querySelector('.above_upload2');
const openPopup2 = document.querySelector('.open__popup2');
const removeFile2 = document.querySelector('.remove_file2');
const PopupEditor2 = document.querySelector('.popup__background2');
const closePopup2 = document.getElementById('closePopupEditor2');
const cropfileInput2 = document.getElementById('croppedImageInput2');

upload2.addEventListener('change', function(e) {
  if (e.target.files.length > 0) {
    PopupEditor2.style.display = 'block';
    aboveUpload2.style.display = 'flex';
    closePopup2.style.display = 'none';
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
      var img = new Image();
      img.onload = function() {
        var editor2 = document.getElementById('editor2');
        editor2.innerHTML = '';
        editor2.appendChild(img);
        cropper2 = new Cropper(img, {
          aspectRatio: 4 / 3,
          crop: function(event) {
            var canvas = cropper2.getCroppedCanvas({
              aspectRatio: 4 / 3
            });
            document.getElementById('preview2').innerHTML = '';
            document.getElementById('preview2').appendChild(canvas);
          }
        });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    PopupEditor2.style.display = 'none';
    document.getElementById('previewResult2').src = '';
    document.querySelector('.main__img').src = originalSrc;
    document.querySelector('.main__img1').src = originalSrc;
    closePopup2.style.display = 'none';
    aboveUpload2.style.display = 'none';
    cropfileInput2.value = '';
  }
});


document.getElementById('cropBtn2').addEventListener('click', function() {
  var canvas = cropper2.getCroppedCanvas({
    aspectRatio: 4 / 3
  });
  PopupEditor2.style.display = 'none';
  closePopup2.style.display = 'flex';
  var croppedImage2 = canvas.toDataURL();
  document.getElementById('previewResult2').src = croppedImage2;
  document.querySelector('.main__img').src = croppedImage2;
  document.querySelector('.main__img1').src = croppedImage2;

  fetch(croppedImage2)
    .then(res => res.blob())
    .then(blob => {
      var cropfileInput2 = document.getElementById('croppedImageInput2');
      var fileList2 = createFileList(blob, 'croppedImage2.png');
      cropfileInput2.files = fileList2;
    });
  function createFileList(file2, name2) {
    var fileList2 = new DataTransfer();
    var newFile2 = new File([file2], name2);
    fileList2.items.add(newFile2);
    return fileList2.files;
  }    
});

closePopup2.addEventListener('click', function() {
  PopupEditor2.style.display = 'none';
});

document.getElementById('remove_file_editor2').addEventListener('click', function() {
  upload2.value = '';
  PopupEditor2.style.display = 'none';
  document.getElementById('previewResult2').src = '';
  document.querySelector('.main__img').src = originalSrc;
  document.querySelector('.main__img1').src = originalSrc;
  closePopup2.style.display = 'none';
  aboveUpload2.style.display = 'none';
  cropfileInput2.value = '';
});

openPopup2.addEventListener('click', function() {
  PopupEditor2.style.display = 'block';
  var fileInput2 = document.getElementById('upload2');
  var file = fileInput2.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    var img = new Image();
    img.onload = function() {
      var editor2 = document.getElementById('editor2');
      editor2.innerHTML = '';
      editor2.appendChild(img);
      cropper2 = new Cropper(img, {
        aspectRatio: 4 / 3,
        crop: function(event) {
          var canvas = cropper2.getCroppedCanvas({
            aspectRatio: 4 / 3
          });
          document.getElementById('preview2').innerHTML = '';
          document.getElementById('preview2').appendChild(canvas);
        }
      });
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

removeFile2.addEventListener('click', function() {
  upload2.value = '';
  PopupEditor2.style.display = 'none';
  document.getElementById('previewResult2').src = '';
  document.querySelector('.main__img').src = originalSrc;
  document.querySelector('.main__img1').src = originalSrc;
  closePopup2.style.display = 'none';
  aboveUpload2.style.display = 'none';
  cropfileInput2.value = '';
});

function updatePreview2() {
  var inputText2 = document.getElementById("input-text2").value;
  var previewText2 = document.querySelector(".preview-text2");
  previewText2.textContent = inputText2;
  document.querySelector(".info__description").textContent = inputText2;
}

function updateCharCount2() {
  var inputText2 = document.getElementById("input-text2").value;
  var charCount2 = inputText2.length;
  var charLimit2 = 250;
  var charCountElement2 = document.getElementById("char-count2");
  charCountElement2.textContent = charCount2 + "/" + charLimit2;
  var replicatedTextElement2 = document.getElementById("replicated-text2");
  replicatedTextElement2.value = inputText2;
}

var $input2 = $('#input-text2');
$input2.on('input', function(e) {
  var max = 250;
  setTimeout(function() {
    if ($input2.val().length > max) {
      $input2.val($input2.val().substr(0, max));
    }
    updatePreview2();
    updateCharCount2();
  }, 0);
});


const videoInput1 = document.getElementById('video_input1');
const videoInput2 = document.getElementById('video_input2');
const videoContainer = document.querySelector('.video_container');
const videoPreview = document.getElementById('video-preview');
const videoRemove = document.querySelector('.remove_video');

videoInput1.addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
    videoContainer.style.display = 'flex';
    videoInput2.files = e.target.files;
    videoPreview.src = URL.createObjectURL(e.target.files[0]);
    } else {
    videoContainer.style.display = 'none';
    videoPreview.src = '';
    videoInput2.value = '';
    }
});

videoRemove.addEventListener('click', function() {
    videoContainer.style.display = 'none';
    videoPreview.src = '';
    videoInput2.value = '';
});

// container 3.1

var cropper3;
const upload3 = document.getElementById('upload3');
const aboveUpload3 = document.querySelector('.above_upload3');
const openPopup3 = document.querySelector('.open__popup3');
const removeFile3 = document.querySelector('.remove_file3');
const PopupEditor3 = document.querySelector('.popup__background3');
const closePopup3 = document.getElementById('closePopupEditor3');
const cropfileInput3 = document.getElementById('croppedImageInput3');

upload3.addEventListener('change', function(e) {
  if (e.target.files.length > 0) {
    PopupEditor3.style.display = 'block';
    aboveUpload3.style.display = 'flex';
    closePopup3.style.display = 'none';
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
      var img = new Image();
      img.onload = function() {
        var editor3 = document.getElementById('editor3');
        editor3.innerHTML = '';
        editor3.appendChild(img);
        cropper3 = new Cropper(img, {
          aspectRatio: 1 / 1,
          crop: function(event) {
            var canvas = cropper3.getCroppedCanvas({
              aspectRatio: 1 / 1
            });
            document.getElementById('preview3').innerHTML = '';
            document.getElementById('preview3').appendChild(canvas);
          }
        });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    PopupEditor3.style.display = 'none';
    document.getElementById('previewResult3').src = '';
    document.getElementById('list__img1').src = originalSrc;
    closePopup3.style.display = 'none';
    aboveUpload3.style.display = 'none';
    cropfileInput3.value = '';
  }
});


document.getElementById('cropBtn3').addEventListener('click', function() {
  var canvas = cropper3.getCroppedCanvas({
    aspectRatio: 1 / 1
  });
  PopupEditor3.style.display = 'none';
  closePopup3.style.display = 'flex';
  var croppedImage3 = canvas.toDataURL();
  document.getElementById('previewResult3').src = croppedImage3;
  document.getElementById('list__img1').src = croppedImage3;

  fetch(croppedImage3)
    .then(res => res.blob())
    .then(blob => {
      var cropfileInput3 = document.getElementById('croppedImageInput3');
      var fileList3 = createFileList(blob, 'croppedImage3.png');
      cropfileInput3.files = fileList3;
    });
  function createFileList(file3, name3) {
    var fileList3 = new DataTransfer();
    var newFile3 = new File([file3], name3);
    fileList3.items.add(newFile3);
    return fileList3.files;
  }    
});

closePopup3.addEventListener('click', function() {
  PopupEditor3.style.display = 'none';
});

document.getElementById('remove_file_editor3').addEventListener('click', function() {
  upload3.value = '';
  PopupEditor3.style.display = 'none';
  document.getElementById('previewResult3').src = '';
  document.getElementById('list__img1').src = originalSrc;
  closePopup3.style.display = 'none';
  aboveUpload3.style.display = 'none';
  cropfileInput3.value = '';
});

openPopup3.addEventListener('click', function() {
  PopupEditor3.style.display = 'block';
  var fileInput3 = document.getElementById('upload3');
  var file = fileInput3.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    var img = new Image();
    img.onload = function() {
      var editor3 = document.getElementById('editor3');
      editor3.innerHTML = '';
      editor3.appendChild(img);
      cropper3 = new Cropper(img, {
        aspectRatio: 1 / 1,
        crop: function(event) {
          var canvas = cropper3.getCroppedCanvas({
            aspectRatio: 1 / 1
          });
          document.getElementById('preview3').innerHTML = '';
          document.getElementById('preview3').appendChild(canvas);
        }
      });
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

removeFile3.addEventListener('click', function() {
  upload3.value = '';
  PopupEditor3.style.display = 'none';
  document.getElementById('previewResult3').src = '';
  document.getElementById('list__img1').src = originalSrc;
  closePopup3.style.display = 'none';
  aboveUpload3.style.display = 'none';
  cropfileInput3.value = '';
});

// container 3.2

var cropper4;
const upload4 = document.getElementById('upload4');
const aboveUpload4 = document.querySelector('.above_upload4');
const openPopup4 = document.querySelector('.open__popup4');
const removeFile4 = document.querySelector('.remove_file4');
const PopupEditor4 = document.querySelector('.popup__background4');
const closePopup4 = document.getElementById('closePopupEditor4');
const cropfileInput4 = document.getElementById('croppedImageInput4');

upload4.addEventListener('change', function(e) {
  if (e.target.files.length > 0) {
    PopupEditor4.style.display = 'block';
    aboveUpload4.style.display = 'flex';
    closePopup4.style.display = 'none';
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
      var img = new Image();
      img.onload = function() {
        var editor4 = document.getElementById('editor4');
        editor4.innerHTML = '';
        editor4.appendChild(img);
        cropper4 = new Cropper(img, {
          aspectRatio: 1 / 1,
          crop: function(event) {
            var canvas = cropper4.getCroppedCanvas({
              aspectRatio: 1 / 1
            });
            document.getElementById('preview4').innerHTML = '';
            document.getElementById('preview4').appendChild(canvas);
          }
        });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    PopupEditor4.style.display = 'none';
    document.getElementById('previewResult4').src = '';
    document.getElementById('list__img2').src = originalSrc;
    closePopup4.style.display = 'none';
    aboveUpload4.style.display = 'none';
    cropfileInput4.value = '';
  }
});


document.getElementById('cropBtn4').addEventListener('click', function() {
  var canvas = cropper4.getCroppedCanvas({
    aspectRatio: 1 / 1
  });
  PopupEditor4.style.display = 'none';
  closePopup4.style.display = 'flex';
  var croppedImage4 = canvas.toDataURL();
  document.getElementById('previewResult4').src = croppedImage4;
  document.getElementById('list__img2').src = croppedImage4;

  fetch(croppedImage4)
    .then(res => res.blob())
    .then(blob => {
      var cropfileInput4 = document.getElementById('croppedImageInput4');
      var fileList4 = createFileList(blob, 'croppedImage4.png');
      cropfileInput4.files = fileList4;
    });
  function createFileList(file4, name4) {
    var fileList4 = new DataTransfer();
    var newFile4 = new File([file4], name4);
    fileList4.items.add(newFile4);
    return fileList4.files;
  }    
});

closePopup4.addEventListener('click', function() {
  PopupEditor4.style.display = 'none';
});

document.getElementById('remove_file_editor4').addEventListener('click', function() {
  upload4.value = '';
  PopupEditor4.style.display = 'none';
  document.getElementById('previewResult4').src = '';
  document.getElementById('list__img2').src = originalSrc;
  closePopup4.style.display = 'none';
  aboveUpload4.style.display = 'none';
  cropfileInput4.value = '';
});

openPopup4.addEventListener('click', function() {
  PopupEditor4.style.display = 'block';
  var fileInput4 = document.getElementById('upload4');
  var file = fileInput4.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    var img = new Image();
    img.onload = function() {
      var editor4 = document.getElementById('editor4');
      editor4.innerHTML = '';
      editor4.appendChild(img);
      cropper4 = new Cropper(img, {
        aspectRatio: 1 / 1,
        crop: function(event) {
          var canvas = cropper4.getCroppedCanvas({
            aspectRatio: 1 / 1
          });
          document.getElementById('preview4').innerHTML = '';
          document.getElementById('preview4').appendChild(canvas);
        }
      });
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

removeFile4.addEventListener('click', function() {
  upload4.value = '';
  PopupEditor4.style.display = 'none';
  document.getElementById('previewResult4').src = '';
  document.getElementById('list__img2').src = originalSrc;
  closePopup4.style.display = 'none';
  aboveUpload4.style.display = 'none';
  cropfileInput4.value = '';
});

// container 3.3

var cropper5;
const upload5 = document.getElementById('upload5');
const aboveUpload5 = document.querySelector('.above_upload5');
const openPopup5 = document.querySelector('.open__popup5');
const removeFile5 = document.querySelector('.remove_file5');
const PopupEditor5 = document.querySelector('.popup__background5');
const closePopup5 = document.getElementById('closePopupEditor5');
const cropfileInput5 = document.getElementById('croppedImageInput5');

upload5.addEventListener('change', function(e) {
  if (e.target.files.length > 0) {
    PopupEditor5.style.display = 'block';
    aboveUpload5.style.display = 'flex';
    closePopup5.style.display = 'none';
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
      var img = new Image();
      img.onload = function() {
        var editor5 = document.getElementById('editor5');
        editor5.innerHTML = '';
        editor5.appendChild(img);
        cropper5 = new Cropper(img, {
          aspectRatio: 1 / 1,
          crop: function(event) {
            var canvas = cropper5.getCroppedCanvas({
              aspectRatio: 1 / 1
            });
            document.getElementById('preview5').innerHTML = '';
            document.getElementById('preview5').appendChild(canvas);
          }
        });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    PopupEditor5.style.display = 'none';
    document.getElementById('previewResult5').src = '';
    document.getElementById('list__img3').src = originalSrc;
    closePopup5.style.display = 'none';
    aboveUpload5.style.display = 'none';
    cropfileInput5.value = '';
  }
});


document.getElementById('cropBtn5').addEventListener('click', function() {
  var canvas = cropper5.getCroppedCanvas({
    aspectRatio: 1 / 1
  });
  PopupEditor5.style.display = 'none';
  closePopup5.style.display = 'flex';
  var croppedImage5 = canvas.toDataURL();
  document.getElementById('previewResult5').src = croppedImage5;
  document.getElementById('list__img3').src = croppedImage5;

  fetch(croppedImage5)
    .then(res => res.blob())
    .then(blob => {
      var cropfileInput5 = document.getElementById('croppedImageInput5');
      var fileList5 = createFileList(blob, 'croppedImage5.png');
      cropfileInput5.files = fileList5;
    });
  function createFileList(file5, name5) {
    var fileList5 = new DataTransfer();
    var newFile5 = new File([file5], name5);
    fileList5.items.add(newFile5);
    return fileList5.files;
  }    
});

closePopup5.addEventListener('click', function() {
  PopupEditor5.style.display = 'none';
});

document.getElementById('remove_file_editor5').addEventListener('click', function() {
  upload5.value = '';
  PopupEditor5.style.display = 'none';
  document.getElementById('previewResult5').src = '';
  document.getElementById('list__img3').src = originalSrc;
  closePopup5.style.display = 'none';
  aboveUpload5.style.display = 'none';
  cropfileInput5.value = '';
});

openPopup5.addEventListener('click', function() {
  PopupEditor5.style.display = 'block';
  var fileInput5 = document.getElementById('upload5');
  var file = fileInput5.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    var img = new Image();
    img.onload = function() {
      var editor5 = document.getElementById('editor5');
      editor5.innerHTML = '';
      editor5.appendChild(img);
      cropper5 = new Cropper(img, {
        aspectRatio: 1 / 1,
        crop: function(event) {
          var canvas = cropper5.getCroppedCanvas({
            aspectRatio: 1 / 1
          });
          document.getElementById('preview5').innerHTML = '';
          document.getElementById('preview5').appendChild(canvas);
        }
      });
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

removeFile5.addEventListener('click', function() {
  upload5.value = '';
  PopupEditor5.style.display = 'none';
  document.getElementById('previewResult5').src = '';
  document.getElementById('list__img3').src = originalSrc;
  closePopup5.style.display = 'none';
  aboveUpload5.style.display = 'none';
  cropfileInput5.value = '';
});

// container 3.4

var cropper6;
const upload6 = document.getElementById('upload6');
const aboveUpload6 = document.querySelector('.above_upload6');
const openPopup6 = document.querySelector('.open__popup6');
const removeFile6 = document.querySelector('.remove_file6');
const PopupEditor6 = document.querySelector('.popup__background6');
const closePopup6 = document.getElementById('closePopupEditor6');
const cropfileInput6 = document.getElementById('croppedImageInput6');

upload6.addEventListener('change', function(e) {
  if (e.target.files.length > 0) {
    PopupEditor6.style.display = 'block';
    aboveUpload6.style.display = 'flex';
    closePopup6.style.display = 'none';
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
      var img = new Image();
      img.onload = function() {
        var editor6 = document.getElementById('editor6');
        editor6.innerHTML = '';
        editor6.appendChild(img);
        cropper6 = new Cropper(img, {
          aspectRatio: 1 / 1,
          crop: function(event) {
            var canvas = cropper6.getCroppedCanvas({
              aspectRatio: 1 / 1
            });
            document.getElementById('preview6').innerHTML = '';
            document.getElementById('preview6').appendChild(canvas);
          }
        });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    PopupEditor6.style.display = 'none';
    document.getElementById('previewResult6').src = '';
    document.getElementById('list__img4').src = originalSrc;
    closePopup6.style.display = 'none';
    aboveUpload6.style.display = 'none';
    cropfileInput6.value = '';
  }
});


document.getElementById('cropBtn6').addEventListener('click', function() {
  var canvas = cropper6.getCroppedCanvas({
    aspectRatio: 1 / 1
  });
  PopupEditor6.style.display = 'none';
  closePopup6.style.display = 'flex';
  var croppedImage6 = canvas.toDataURL();
  document.getElementById('previewResult6').src = croppedImage6;
  document.getElementById('list__img4').src = croppedImage6;

  fetch(croppedImage6)
    .then(res => res.blob())
    .then(blob => {
      var cropfileInput6 = document.getElementById('croppedImageInput6');
      var fileList6 = createFileList(blob, 'croppedImage6.png');
      cropfileInput6.files = fileList6;
    });
  function createFileList(file6, name6) {
    var fileList6 = new DataTransfer();
    var newFile6 = new File([file6], name6);
    fileList6.items.add(newFile6);
    return fileList6.files;
  }    
});

closePopup6.addEventListener('click', function() {
  PopupEditor6.style.display = 'none';
});

document.getElementById('remove_file_editor6').addEventListener('click', function() {
  upload6.value = '';
  PopupEditor6.style.display = 'none';
  document.getElementById('previewResult6').src = '';
  document.getElementById('list__img4').src = originalSrc;
  closePopup6.style.display = 'none';
  aboveUpload6.style.display = 'none';
  cropfileInput6.value = '';
});

openPopup6.addEventListener('click', function() {
  PopupEditor6.style.display = 'block';
  var fileInput6 = document.getElementById('upload6');
  var file = fileInput6.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    var img = new Image();
    img.onload = function() {
      var editor6 = document.getElementById('editor6');
      editor6.innerHTML = '';
      editor6.appendChild(img);
      cropper6 = new Cropper(img, {
        aspectRatio: 1 / 1,
        crop: function(event) {
          var canvas = cropper6.getCroppedCanvas({
            aspectRatio: 1 / 1
          });
          document.getElementById('preview6').innerHTML = '';
          document.getElementById('preview6').appendChild(canvas);
        }
      });
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

removeFile6.addEventListener('click', function() {
  upload6.value = '';
  PopupEditor6.style.display = 'none';
  document.getElementById('previewResult6').src = '';
  document.getElementById('list__img4').src = originalSrc;
  closePopup6.style.display = 'none';
  aboveUpload6.style.display = 'none';
  cropfileInput6.value = '';
});

// PREVIEW JS

// Selecionando os elementos HTML
const previousBtn = document.getElementById('btn_previous');
const nextBtn = document.getElementById('btn_next');
const prvPage1 = document.querySelector('.prv_page1');
const prvPage2 = document.querySelector('.prv_page2');
const prvPage3 = document.querySelector('.prv_page3');

// Definindo o estado inicial das páginas
let currentPage = 1;
updatePageVisibility();

// Função para atualizar a visibilidade das páginas
function updatePageVisibility() {
  if (currentPage === 1) {
    prvPage1.style.display = 'block';
    prvPage2.style.display = 'none';
    prvPage3.style.display = 'none';
    previousBtn.style.display = 'none';
    nextBtn.style.display = 'block';
  } else if (currentPage === 2) {
    prvPage1.style.display = 'none';
    prvPage2.style.display = 'block';
    prvPage3.style.display = 'none';
    previousBtn.style.display = 'block';
    nextBtn.style.display = 'block';
  } else if (currentPage === 3) {
    prvPage1.style.display = 'none';
    prvPage2.style.display = 'none';
    prvPage3.style.display = 'block';
    previousBtn.style.display = 'block';
    nextBtn.style.display = 'none';
  }
}

// Função para ir para a página anterior
function goToPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    updatePageVisibility();
  }
}

// Função para ir para a próxima página
function goToNextPage() {
  if (currentPage < 3) {
    currentPage++;
    updatePageVisibility();
  }
}

// Adicionando os event listeners aos botões
previousBtn.addEventListener('click', goToPreviousPage);
nextBtn.addEventListener('click', goToNextPage);