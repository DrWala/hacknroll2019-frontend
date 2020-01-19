let list_of_questions = ["1", "2", "3"]
let user_answers = { 
    "12312312": { 
        "1": 5,
        "2": "No",
        "3": "false"
    },
    "23523423": { 
        "1": 9,
        "2": "Yes",
        "3": "true"
    },
    "2352342": { 
        "1": 2,
        "2": "No",
        "3": "true"
    },
    "2342344": { 
        "1": 4,
        "2": "No",
        "3": "false"
    },
    "234234234": { 
        "1": 1,
        "2": "Yes",
        "3": "true"
    },
    "23423423": { 
        "1": 7,
        "2": "No",
        "3": "false"
    },
    "34534543": { 
        "1": 5,
        "2": "Yes",
        "3": "false"
    } 
}

let all_keys = Object.keys(user_answers)
let all_answers = Object.values(user_answers);
let chart_data = []
list_of_questions.forEach(q => {
    if(chart_data[q] === undefined) {
        chart_data[q] = all_answers.map(ans => ans[q])
    }
})
chart_data = chart_data.filter(el => el != null);    
console.log(all_keys)
console.log(chart_data)