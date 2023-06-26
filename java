import java.util.ArrayList;
import java.util.List;

class PowerOfTwoMaxHeap {
    private final int power;
    private final List<Integer> heap;

    public PowerOfTwoMaxHeap(int power) {
        this.power = power;
        this.heap = new ArrayList<>();
    }

    public void insert(int value) {
        heap.add(value);
        bubbleUp(heap.size() - 1);
    }

    public int popMax() {
        if (heap.isEmpty()) {
            throw new IllegalStateException("Heap is empty.");
        }

        int max = heap.get(0);
        int last = heap.remove(heap.size() - 1);

        if (!heap.isEmpty()) {
            heap.set(0, last);
            siftDown(0);
        }

        return max;
    }

    private void bubbleUp(int index) {
        int parentIndex = (index - 1) / (1 << power);

        if (parentIndex >= 0 && heap.get(parentIndex) < heap.get(index)) {
            swap(parentIndex, index);
            bubbleUp(parentIndex);
        }
    }

    private void siftDown(int index) {
        int childIndexOffset = 1 << power;
        int startIndex = index * childIndexOffset + 1;
        int endIndex = Math.min(startIndex + childIndexOffset, heap.size());

        int maxChildIndex = startIndex;

        for (int i = startIndex + 1; i < endIndex; i++) {
            if (heap.get(i) > heap.get(maxChildIndex)) {
                maxChildIndex = i;
            }
        }

        if (maxChildIndex < heap.size() && heap.get(maxChildIndex) > heap.get(index)) {
            swap(index, maxChildIndex);
            siftDown(maxChildIndex);
        }
    }

    private void swap(int i, int j) {
        int temp = heap.get(i);
        heap.set(i, heap.get(j));
        heap.set(j, temp);
    }
}
