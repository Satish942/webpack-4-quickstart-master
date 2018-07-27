
function testResults(form) {
    var key = form.key.value;
    var operation = form.operation.value;
    alert(operation);
    alert("You typed: " + TestVar);
    if (key != null && operation != null) {
        if (operation === 'getUserInfo') {
            document.getElementById("response").innerHTML = getUserInfo(key);
        }
        if (operation === 'createRepo') {
            document.getElementById("response").innerHTML = createRepo(key, newrepo);
        }
        if (operation === 'createNewIssue') {
            document.getElementById("response").innerHTML = createNewIssue(key, reponame);
        }
        if (operation === 'deleteIssue') {
            document.getElementById("response").innerHTML = deleteIssue(key, reponame);
        }
        if (operation === 'getCollaborator') {
            document.getElementById("response").innerHTML = getCollaborator(key, reponame);
        }
        if (operation === 'userAsCollaborator') {
            document.getElementById("response").innerHTML = userAsCollaborator(key, reponame, user);
        }

    } else {
        document.getElementById("response").innerHTML = "Response is empty";
    }
}

function getUserInfo(opts) {
    return new Promise((resolve, reject) => {
        fetch('https://api.github.com/users/antstore', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "token " + opts
            }
        }).then(function (response) {
            return response.text();
        })
            .then(function (myJson) {
                resolve(myJson)
            });
    })

}


function createRepo(key, newrepo) {
    return fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "token " + key
        },
        body: {
            "name": newrepo,
            "auto_init": true,
            "private": false,
            "gitignore_template": "nanoc"
        }
    }).then(function (response) {
        return response.text();
    })
        .then(function (myJson) {
            console.log(myJson);
        });
}

function createNewIssue(key, reponame) {
    return fetch('https://api.github.com/repos/antstore/' + reponame + '/issues', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "token " + key
        },
        body: {
            "title": "Found a bug " + Math.random(),
            "body": "I'm having a problem with this.",
            "assignees": [
                "antstore"
            ],

            "labels": [
                "bug"
            ]
        }
    }).then(function (response) {
        return response.text();
    })
        .then(function (myJson) {
            console.log(myJson);
        });
}

function deleteIssue(key, reponame) {
    return fetch('https://api.github.com/repos/antstore/' + reponame + '/issues', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "token " + key
        },
        body: {
            "title": "Found a bug " + Math.random(),
            "body": "I'm having a problem with this.",
            "assignees": [
                "antstore"
            ],

            "labels": [
                "bug"
            ]
        }
    }).then(function (response) {
        return response.text();
    })
        .then(function (myJson) {
            console.log(myJson);
        });
}

function getCollaborator(opts, reponame) {
    return fetch('https://api.github.com/repos/antstore/' + reponame + '/collaborators', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "token " + opts
        }
    }).then(function (response) {
        return response.text();
    })
        .then(function (myJson) {
            console.log(myJson);
        });
}

function userAsCollaborator(opts, reponame, user) {
    return fetch('https://api.github.com/repos/antstore/' + reponame + '/collaborators/' + user, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "token " + opts
        }
    }).then(function (response) {
        return response.text();
    })
        .then(function (myJson) {
            console.log(myJson);
        });
}
