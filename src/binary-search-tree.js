const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.start = null
  }

  addValue(node, data) {
    if (!node) {                           // если узла нет, просто возвращаем этот узел
      return new Node(data) 
    } else if (node.data === data) {     // если значение узла равно значению, то ничего не добавляем (это коллекция ункальных эл-тов)
      return node
    } else if (data < node.data) {
      node.left = this.addValue(node.left, data)
      return node
    } else if (data > node.data) {
      node.right = this.addValue(node.right, data)
      return node
    }  
  }

  searchValue(node, data) {
    if(!node) {
      return node
    }
    if (node.data === data) {
      return node
    } 
    if (data < node.data) {
      return this.searchValue(node.left, data)
    }
    if (data > node.data) {
      return this.searchValue(node.right, data)
    }
  }

  removeValue(node, data) {
    if (!node) {
      return null
    } 
    if (data < node.data) {
      node.left = this.removeValue(node.left, data)
      return node
    }
    if (data > node.data) {
      node.right = this.removeValue(node.right, data)
      return node
    } else {
      if (!node.left && !node.right) {
        return null
      }
      if (!node.left) {
        node = node.right
        return node
      }
      if (!node.right) {
        node = node.left
        return node
      }
    }
    // если оба узла существуют
    let minNode = node.right
    while(minNode.left) {
      minNode = minNode.left
    }
    node.data = minNode.data
    node.right = this.removeValue(node.right, minNode.data)

    return node
  }

  root() {
    return this.start;
  }

  add(data) {
    this.start = this.addValue(this.start, data)
  }

  has(data) {
    return !!this.searchValue(this.start, data)
  }

  find(data) {
    return this.searchValue(this.start, data) ?? null
  }

  remove(data) {
    this.removeValue(this.start, data)
  }

  min() {
    let min = this.start

    while (min.left) {
      min = min.left
    }

    return min.data
  }

  max() {
    let max = this.start

    while (max.right) {
      max = max.right
    }

    return max.data
  }
}

module.exports = {
  BinarySearchTree
};