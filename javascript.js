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

    find(value, node = this.root) {
        if (!node) {return null};

        if (value < node.data) {
            return this.find(value, node.left);
        } else if (value > node.data) {
            return this.find(value, node.right);
        } else {
            return node;
        }
    }

    levelOrder(callback, node = this.root) {
        if (!node) {return null;}

        let queue = [node];

        while(queue.length > 0) {

            let current = queue.shift();
            callback(current);
            if(current.left) {
                queue.push(current.left);
            }

            if(current.right) {
                queue.push(current.right)
            }
        }
    }


    inOrder(callback, node = this.root) {
        if (!node) {return null;}

        this.inOrder(callback, node.left);
        callback(node);
        this.inOrder(callback, node.right);

    }

    preOrder(callback, node = this.root) {
        if (!node) {return null;}

        callback(node);
        this.preOrder(callback, node.left);
        this.preOrder(callback, node.right);
    }

    postOrder(callback, node = this.root) {
        if (!node) {return null;}

        this.postOrder(callback, node.left);
        this.postOrder(callback, node.right);
        callback(node);
    }


    depth(value, node = this.root, depth = 0) {
        if (!node) {return null;}

        if (value < node.data) {
            return this.depth(value, node.left, depth + 1);
        } else if (value > node.data) {
            return this.depth(value, node.right, depth + 1);
        } else {
            return depth; // node found. return depth counter
        }
    }

    height(value, node = this.root) {
        node = this.find(value);

        if (!node) {return null};

        return this.heightHelper(node);

    }

    heightHelper(node) {
        if (!node) {return -1};

        const leftHeight = this.heightHelper(node.left);
        const rightHeight = this.heightHelper(node.right);

        return 1 + Math.max(leftHeight, rightHeight);
    }
    

    isBalanced(node = this.root) {
        // check if left height and right height is the same for every node
        if (!node) {return true};

        const leftHeight = this.heightHelper(node.left);
        const rightHeight = this.heightHelper(node.right);

        if (leftHeight - rightHeight <= 1 || rightHeight - leftHeight <= 1) {
            return this.isBalanced(node.left) && this.isBalanced(node.right);
        } else {
            return false;
        }
    }

    rebalance() {
        let sortedArray = this.sortedArrayFromTree();

        this.root = this.buildTree(sortedArray);
    }

    sortedArrayFromTree(node = this.root, arr = []) {
        if (!node) return arr;
        this.sortedArrayFromTree(node.left, arr);
        arr.push(node.value);
        this.sortedArrayFromTree(node.right, arr);
        return arr;
    }
}