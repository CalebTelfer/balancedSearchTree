class TreeNode {
    constructor() {
        this.data = null;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(sortedArray) {
        this.root = buildTree(sortedArray);
    }

    buildTree(array, start, end) {
        if(start > end) {return null;};

        let mid = (start+end)/2;

        const root = new TreeNode();
        root.data = array[mid];

        root.left = this.buildTree(array, start, mid-1);
        root.right = this.buildTree(array, mid+1, end);

        return root;
    }
}