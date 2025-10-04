import { world, MinecraftBlockTypes, BlockLocation, ItemStack, Items } from "mojang-minecraft";
import { ActionFormData } from "mojang-minecraft-ui";

function openSandCraftUI(player) {
    const form = new ActionFormData()
        .title("SandCraft Menu")
        .button("Place Barrier")
        .button("Give Iron Pickaxe")
        .button("Place Bedrock")
        .button("Close") // Close button
        .onResponse(response => {
            if (response.selection === 3) return; // Close does nothing

            const pos = player.location;
            const look = player.getViewDirection();
            const target = new BlockLocation(
                Math.floor(pos.x + look.x * 2),
                Math.floor(pos.y + look.y * 2),
                Math.floor(pos.z + look.z * 2)
            );

            switch (response.selection) {
                case 0: world.getDimension("overworld").setBlock(target, MinecraftBlockTypes.barrier.createDefaultBlock()); break;
                case 1: player.addItem(new ItemStack(Items.ironPickaxe, 1)); break;
                case 2: world.getDimension("overworld").setBlock(target, MinecraftBlockTypes.bedrock.createDefaultBlock()); break;
            }
        });
    player.showForm(form);
}

// Trigger: Crouch + Stick
world.events.tick.subscribe(() => {
    for (const player of world.getPlayers()) {
        if (player.isSneaking() && player.getMainHandItem()?.id === "minecraft:stick") {
            openSandCraftUI(player);
        }
    }
});
