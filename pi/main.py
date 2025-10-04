from mcpi.minecraft import Minecraft
from mcpi import block
from pynput import keyboard
import threading
import tkinter as tk

mc = Minecraft.create()

# Actions
def place_barrier():
    pos = mc.player.getTilePos()
    mc.setBlock(pos.x + 2, pos.y, pos.z, block.BARRIER)

def place_bedrock():
    pos = mc.player.getTilePos()
    mc.setBlock(pos.x + 2, pos.y, pos.z, block.BEDROCK)

def give_iron_pickaxe():
    # 257 = Iron Pickaxe
    mc.player.setInventorySlot(0, 257, 1)

# Function to open the Tkinter UI
def open_ui():
    def ui_thread():
        root = tk.Tk()
        root.title("SandCraft - Pi Edition")
        tk.Button(root, text="Place Barrier", command=place_barrier, width=25).pack(pady=5)
        tk.Button(root, text="Place Bedrock", command=place_bedrock, width=25).pack(pady=5)
        tk.Button(root, text="Give Iron Pickaxe", command=give_iron_pickaxe, width=25).pack(pady=5)
        root.mainloop()
    threading.Thread(target=ui_thread).start()

# Global key listener for V key
def on_press(key):
    try:
        if key.char == 'v':
            open_ui()
    except AttributeError:
        pass

listener = keyboard.Listener(on_press=on_press)
listener.start()
listener.join()
