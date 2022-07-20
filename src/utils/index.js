import Graph from "graphology";

const categoryAccess = d=>d.category;

export const getCategorys = (dataset)=>{
    const categoryArr = dataset.map(categoryAccess);
    return [...new Set(categoryArr)];
}

export const getCategoryData = (dataset,category)=>{
    return dataset.filter(d=>d.category === category);
}

export const seriesNetworkData = (categoryData)=>{
    const graph = new Graph();
    const sourceAccess = d=>d.source;
    const targetAccess = d=>d.target;
    const pressArray = [...new Set(categoryData.map(sourceAccess).concat(categoryData.map(targetAccess)))]
    pressArray.forEach(press=>{
        graph.addNode(press,{key:press,label:press})
    })

    categoryData.forEach(data=>{
        graph.addEdgeWithKey(data.source+'->'+data.target, data.source, data.target, {type: 'KNOWS',size:data.times});
    })

    graph.forEachNode((node) => {
        const degree = graph.degree(node);
        graph.setNodeAttribute(
          node,
          "size",
          degree
        );
    });
    graph.setAttribute('name', 'My Graph');
    return graph.export();

}