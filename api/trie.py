from collections import defaultdict


class Node:
    __slots__ = ['children', 'is_leaf']

    def __init__(self):
        self.children = defaultdict(Node)
        self.is_leaf = False

    def insert(self, word):
        node = self
        for character in word:
            node = node.children[character]
        node.is_leaf = True

    def search(self, prefix):
        if not prefix:
            return []

        node = self
        for character in prefix:
            if character in node.children:
                node = node.children[character]
            else:
                return []

        return [''.join(r) for r in self.traverse(node, list(prefix))]

    def traverse(self, parent, prefix):
        if parent.is_leaf:
            yield prefix

        for character, node in parent.children.items():
            prefix.append(character)
            yield from self.traverse(node, prefix)
            prefix.pop()

