<?php
if (!isset($webpage)) die('Direct access not allowed');
if ($dataView->rows != null)
{
?>
<div class="grid_wrapper" id="sort_holder">
	<?php //include($dataView->categoriesBlock); ?>
</div>
<?php 
} 
?>
<div class="grid_buttons"><?php echo HtmlControls::GenerateGridButtons('events', $trans['events.new_item'], $trans['events.delete_selected_items'])?></div>
