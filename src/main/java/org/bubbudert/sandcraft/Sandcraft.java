@Override
protected void init() {
    int y = 20;
    this.addButton(new Button(10, y, 200, 20, new StringTextComponent("Place Barrier"), b -> placeBlock(Blocks.BARRIER))); y+=25;
    this.addButton(new Button(10, y, 200, 20, new StringTextComponent("Give Iron Pickaxe"), b -> giveIronPickaxe())); y+=25;
    this.addButton(new Button(10, y, 200, 20, new StringTextComponent("Place Bedrock"), b -> placeBlock(Blocks.BEDROCK))); y+=25;
    this.addButton(new Button(10, y, 200, 20, new StringTextComponent("Close"), b -> this.onClose())); y+=25;
}

@Override
public void onClose() {
    this.minecraft.setScreen(null); // Closes GUI
}

private void placeBlock(Block block) {
    Minecraft mc = Minecraft.getInstance();
    RayTraceResult ray = mc.objectMouseOver;
    if (ray.getType() == RayTraceResult.Type.BLOCK) {
        BlockPos pos = ray.getPos().offset(ray.getFace());
        mc.level.setBlock(pos, block.defaultBlockState(), 3);
    }
}

private void giveIronPickaxe() {
    Minecraft mc = Minecraft.getInstance();
    Player player = mc.player;
    if (player != null) {
        ItemStack stack = new ItemStack(Items.IRON_PICKAXE, 1);
        player.addItem(stack);
    }
}
