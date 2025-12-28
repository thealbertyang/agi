import { Bus } from '../bus'
import { Command } from '../command'
import { File } from '../file'
import { FileWatcher } from '../file/watcher'
import { Format } from '../format'
import { LSP } from '../lsp'
import { Plugin } from '../plugin'
import { Share } from '../share/share'
import { Instance } from './instance'
import { Project } from './project'
import { Vcs } from './vcs'
import { ShareNext } from '@/share/share-next'
import { Log } from '@/util/log'

export async function InstanceBootstrap() {
	Log.Default.info('bootstrapping', { directory: Instance.directory })
	await Plugin.init()
	Share.init()
	ShareNext.init()
	Format.init()
	await LSP.init()
	FileWatcher.init()
	File.init()
	Vcs.init()

	Bus.subscribe(Command.Event.Executed, async (payload) => {
		if (payload.properties.name === Command.Default.INIT) {
			await Project.setInitialized(Instance.project.id)
		}
	})
}
