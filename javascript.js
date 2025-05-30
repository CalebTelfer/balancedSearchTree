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

    insert(insert) {
        const value = new TreeNode;
        value.data = insert;

        if(!this.root) {
            this.root = value;
            return;
        }

        let currentRoot = this.root;

        while(currentRoot) {    //runs while evaluting root is not null!
            if(value.data == currentRoot.data) {break;}; //no duplicates for this tree. im lazy

            if(value.data < currentRoot.data) {  //if our root is less than root we are comparing to
                 if (currentRoot.left) {
                    currentRoot = currentRoot.left;
                 } else {
                    currentRoot.left = value;
                    break;
                 }
            }



            if(value.data > currentRoot.data) {  //if our root is more than root we are comparing to
                if (currentRoot.right) {
                   currentRoot = currentRoot.right;
                } else {
                   currentRoot.right = value;
                   break;
                }
           }
        }


        
    }


    deleteItem(value, node = this.root, parent = null) { // lets assume value here is a number not a node. project spec didnt say.
        if (!node) return false;

        if (value < node.data) {
            return this.deleteItem(value, node.left, node);
        } else if (value > node.data) {
            return this.deleteItem(value, node.right, node);
        } else {

            //case no child
            if(!node.left && !node.right) {
                if (node == parent.left) {
                    parent.left = null;
                } else {
                    parent.right = null;
                }
            } else if ((!node.left && node.right) || (!node.right && node.left)) { //case one child
                if (parent.left == node) {
                    if(node.left) {
                        parent.left = node.left;
                    } else {
                        parent.left = node.right;
                    }
                } else {
                    if(node.left) {
                        parent.right = node.left;
                    } else {
                        parent.right = node.right;
                    }
                }

            } else { // case two children.
                let successor = node.right;
                let successorParent = node;
    
                while (successor.left) {
                    successorParent = successor;
                    successor = successor.left;
                }

                node.data = successor.data;
                this.deleteItem(successor.data, successor, successorParent);

            }
            return true;
        }
    }
}