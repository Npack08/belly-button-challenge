// Get the URL endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
let globalData = [];
// Read the Samples.Json using the D3 library
d3.json(url).then(function (data) {
    globalData = data;
    populateDropDown(data);
    generateBarChart(data);
    generateBubbleChart(data);
    generateIdCard(data);

});

const populateDropDown = (data, selectedSubjectId = "940") => {
    // Create dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // Populate dropdown menu 
    data.names.forEach(name => {
        dropdownMenu.append("option").text(name).property("value", name).property("selected", selectedSubjectId == name ? true : null)
    });
}

const generateIdCard = (data, subjectId = "940") => {
    let id = data.metadata.find(x => x.id == subjectId).id;
    d3.select("#metadata-subjectid").text(id);
    let ethnicity = data.metadata.find(x => x.id == subjectId).ethnicity;
    d3.select("#metadata-ethnicity").text(ethnicity);
    let gender = data.metadata.find(x => x.id == subjectId).gender;
    d3.select("#metadata-gender").text(gender);
    let age = data.metadata.find(x => x.id == subjectId).age;
    d3.select("#metadata-age").text(age);
    let location = data.metadata.find(x => x.id == subjectId).location;
    d3.select("#metadata-location").text(location);
    let bbtype = data.metadata.find(x => x.id == subjectId).bbtype;
    d3.select("#metadata-bbtype").text(bbtype);
    let wfreq = data.metadata.find(x => x.id == subjectId).wfreq;
    d3.select("#metadata-wfreq").text(wfreq);
}



const generateBarChart = (data, subjectId = "940") => {
    console.log(data);

    // create variables:

    let sample_values = data.samples.find(x => x.id == subjectId).sample_values.slice(0, 10).reverse();
    console.log(sample_values)
    let ids = data.samples.find(x => x.id == subjectId).otu_ids.slice(0, 10).map(id => "OTU " + id).reverse();
    console.log(ids)
    let labels = data.samples.find(x => x.id == subjectId).otu_labels.slice(0, 10).reverse();
    console.log(labels);



    // Trace the data
    var trace1 = {
        x: sample_values,
        y: ids,
        text: labels,
        type: "bar",
        orientation: "h"
    }


    //Display the bar plot
    let layout = {
        title: "Samples",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
    };
    Plotly.newPlot("bar", [trace1], layout);

};

const generateBubbleChart = (data, subjectId = "940") => {
    //Create variables for bubble chart
    let sample_values = data.samples.find(x => x.id == subjectId).sample_values;
    let otu_ids = data.samples.find(x => x.id == subjectId).otu_ids;
    let otu_labels = data.samples.find(x => x.id == subjectId).otu_labels;

    //Create a Bubble plot
    let trace2 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: 'Earth'
        }
    };

    // Bubble plot layout
    let layout2 = {
        title: " Bubble Chart",
        xaxis: {
            title: "OTU ID"
        },
        yaxis: {
            title: "Sample Value"
        },
        showlegend: false,
        height: 600,
        width: 1200
    };
    Plotly.newPlot("bubble", [trace2], layout2);


};

const optionChanged = selectedSubjectId => {
    generateBarChart(globalData, selectedSubjectId);
    generateBubbleChart(globalData, selectedSubjectId);
    generateIdCard(globalData, selectedSubjectId);
    generateIdCard(globalData, selectedEthnicity);
}